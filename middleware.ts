import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/ja') {
    const url = new URL(request.url)
    url.pathname = '/ja/'
    return NextResponse.redirect(url, 308)
  }

  if (pathname !== '/' && pathname.endsWith('/') && pathname !== '/ja/') {
    const url = new URL(request.url)
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 308)
  }

  const requestHeaders = new Headers(request.headers)
  const isLPPreview = ['/lp-a', '/lp-b', '/lp-c', '/ja/consultation', '/ja/signup'].includes(pathname)
  requestHeaders.set('x-gappy-lp-preview', isLPPreview ? 'true' : 'false')
  requestHeaders.set('x-gappy-custom-layout', isLPPreview || pathname === '/ja/' ? 'true' : 'false')
  const isJapanese = isLPPreview ||
    pathname === '/ja/' || pathname.startsWith('/ja/')

  requestHeaders.set('x-gappy-locale', isJapanese ? 'ja' : 'en')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
