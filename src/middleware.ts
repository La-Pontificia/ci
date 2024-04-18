import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const oul = req.nextUrl.clone()

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })
  const response = NextResponse.next()

  if (oul.pathname === '/me') {
    if (session) {
      return response
    } else {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (url.pathname === '/') {
    if (session) {
      url.pathname = '/me'
      return NextResponse.redirect(url)
    } else {
      return response
    }
  }

  if (!session) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return response
}
export const config = {
  matcher: [
    '/',
    '/me/:path*',
    '/records/:path*',
    '/bookings/:path*',
    '/users/:path*',
    '/floors/:path*'
  ]
}
