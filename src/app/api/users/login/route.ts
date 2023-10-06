import { connect } from '@/db/config'
import UserModel from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    // check if user exists
    const user = await UserModel.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: 'No User Exists', status: 400 })
    }

    const validatePassword = await bcryptjs.compare(password, user.password)
    if (!validatePassword) {
      return NextResponse.json({ message: 'Invalid Password', status: 400 })
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    //create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    })
    response.cookies.set('token', token, {
      httpOnly: true,
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
