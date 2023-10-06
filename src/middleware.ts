import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPubicPath = path === '/login' || path === '/signup'

  const isToken = request.cookies.get('token')?.value || ''

  if (isPubicPath && isToken) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPubicPath && !isToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/profile/:id*'],
}
