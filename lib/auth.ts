import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/**
 * Verify admin authentication from request
 * Checks for valid Supabase JWT token with admin role
 */
export async function verifyAdmin(request: NextRequest): Promise<{
  user: any
  error?: string
}> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        user: null,
        error: 'Missing or invalid authorization header'
      }
    }

    const token = authHeader.replace('Bearer ', '')

    // Create Supabase client with the token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    // Verify the token and get user
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return {
        user: null,
        error: 'Invalid or expired token'
      }
    }

    // Check if user has admin role
    const isAdmin = 
      user.role === 'admin' ||
      user.user_metadata?.role === 'admin' ||
      user.app_metadata?.role === 'admin'

    if (!isAdmin) {
      return {
        user: null,
        error: 'Insufficient permissions - admin role required'
      }
    }

    return { user }
  } catch (error) {
    console.error('Admin verification error:', error)
    return {
      user: null,
      error: 'Authentication failed'
    }
  }
}

/**
 * Middleware wrapper for admin-only routes
 * Returns 401/403 if not authenticated/authorized
 */
export async function requireAdmin(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
): Promise<NextResponse> {
  const { user, error } = await verifyAdmin(request)

  if (error || !user) {
    return NextResponse.json(
      { error: error || 'Unauthorized' },
      { status: error?.includes('permissions') ? 403 : 401 }
    )
  }

  return handler(request, user)
}

/**
 * Optional: Simple API key check for development/testing
 * NOT recommended for production - use Supabase Auth instead
 */
export function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key')
  const validKey = process.env.ADMIN_API_KEY

  if (!validKey) {
    console.warn('ADMIN_API_KEY not set - API key auth disabled')
    return false
  }

  return apiKey === validKey
}
