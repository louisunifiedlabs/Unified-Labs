import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Generate a random nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Build CSP directives
  // - script-src uses nonce so only our own scripts run (blocks Inferno Drainer style injection)
  // - connect-src whitelists only the APIs we actually call
  // - style-src needs 'unsafe-inline' for Tailwind/Next.js inline styles
  // - font-src allows Google Fonts
  // - frame-ancestors 'none' prevents clickjacking
  const cspDirectives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' https: data: blob:`,
    `connect-src 'self' https://*.supabase.co ${process.env.NEXT_PUBLIC_GHOST_URL || ''}`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ]

  const cspHeader = cspDirectives.join('; ')

  // Clone request headers and set the nonce for server components to read
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Set CSP header
  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: [
    // Match all routes except static files and api routes that don't need CSP
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
