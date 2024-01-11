import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const originUrl = req.nextUrl.clone()

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  const response = NextResponse.next()

  if (originUrl.pathname === '/me') {
    if (session) {
      response.cookies.set('uft-ln', session?.sub ?? '')
      return response
    } else {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (url.pathname === '/') {
    if (session) {
      url.pathname = '/me'
      response.cookies.set('uft-ln', session?.sub ?? '')
      return NextResponse.redirect(url)
    } else {
      return response
    }
  }

  if (!session) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  response.cookies.set('uft-ln', session?.sub ?? '')
  return response
}
export const config = {
  matcher: ['/', '/me', '/api/:path', '/workspace/:path*']
}
