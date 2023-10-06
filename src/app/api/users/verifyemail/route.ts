import { connect } from '@/db/config'
import UserModel from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token } = reqBody
    console.log(token)

    const user = await UserModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: 'No user found', status: 400 })
    }

    console.log(user)

    user.verified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({ message: 'Email Verified', status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
