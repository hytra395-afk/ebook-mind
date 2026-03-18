'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/**
 * Get current admin JWT token from Supabase session
 * Creates a fresh client each time to ensure we get the latest session
 */
export async function getAdminToken(): Promise<string | null> {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    if (!session?.access_token) {
      console.error('No access token in session')
      return null
    }
    
    return session.access_token
  } catch (error) {
    console.error('Error getting admin token:', error)
    return null
  }
}

/**
 * Make authenticated API request to admin endpoints
 * Automatically includes JWT token in Authorization header
 */
export async function adminApiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAdminToken()
  
  if (!token) {
    throw new Error('Not authenticated - please login first')
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Helper for GET requests
 */
export async function adminGet(url: string) {
  const response = await adminApiFetch(url, { method: 'GET' })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }
  return response.json()
}

/**
 * Helper for POST requests
 */
export async function adminPost(url: string, data: any) {
  const response = await adminApiFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }
  return response.json()
}

/**
 * Helper for PUT requests
 */
export async function adminPut(url: string, data: any) {
  const response = await adminApiFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }
  return response.json()
}

/**
 * Helper for DELETE requests
 */
export async function adminDelete(url: string) {
  const response = await adminApiFetch(url, { method: 'DELETE' })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }
  return response.json()
}
