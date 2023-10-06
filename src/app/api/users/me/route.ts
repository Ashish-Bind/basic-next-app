import { getTokenData } from '@/helpers/getTokenData'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/userModel'
import { connect } from '@/db/config'

connect()

export async function GET(request: NextRequest) {
  try {
    const userTokenData = await getTokenData(request)
    const userDoc = await UserModel.findById(userTokenData.id).select(
      '-password'
    )
    return NextResponse.json({ user: userDoc })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
