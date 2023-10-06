import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ''
    const userTokenData: any = jwt.verify(token, process.env.SECRET_TOKEN!)
    return userTokenData
  } catch (error: any) {
    throw new Error(error.message)
  }
}
