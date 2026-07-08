import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMITS = {
  '/api/download': { maxRequests: 10, windowMs: 60000 }, // 10 requests per minute
  '/api/orders/create': { maxRequests: 5, windowMs: 60000 }, // 5 requests per minute
  '/api/sepay/webhook': { maxRequests: 100, windowMs: 60000 }, // 100 requests per minute
  '/api/admin': { maxRequests: 30, windowMs: 60000 }, // 30 requests per minute
}

function getRateLimitKey(ip: string, path: string): string {
  return `${ip}:${path}`
}

function checkRateLimit(request: NextRequest): boolean {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const path = request.nextUrl.pathname
  
  // Find matching rate limit config
  let config = null
  for (const [pattern, limit] of Object.entries(RATE_LIMITS)) {
    if (path.startsWith(pattern)) {
      config = limit
      break
    }
  }
  
  if (!config) return true // No rate limit for this path
  
  const key = getRateLimitKey(ip, path)
  const now = Date.now()
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    // Create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return true
  }
  
  if (record.count >= config.maxRequests) {
    return false // Rate limit exceeded
  }
  
  record.count++
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // PROTECT ADMIN ROUTES - Require authentication
  if (pathname.startsWith('/admin')) {
    // Check for session cookie
    const token = request.cookies.get('sb-access-token') || request.cookies.get('supabase-auth-token')
    
    if (!token) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    if (!checkRateLimit(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }
  
  // Add security headers
  const response = NextResponse.next()

  // CSP is now configured in next.config.js (Vercel best practice)
  // Additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
