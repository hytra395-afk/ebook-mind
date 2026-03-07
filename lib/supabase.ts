import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

// Client-side Supabase client
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabase) {
      if (!supabaseUrl || !supabaseAnonKey) throw new Error('Missing Supabase env vars')
      _supabase = createClient(supabaseUrl, supabaseAnonKey)
    }
    return (_supabase as any)[prop]
  }
})

// Server-side Supabase client with service role (for admin operations)
export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabaseAdmin) {
      if (!supabaseUrl || !supabaseServiceKey) throw new Error('Missing Supabase env vars')
      _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false }
      })
    }
    return (_supabaseAdmin as any)[prop]
  }
})

// Server-side Supabase client with cookies (for SSR)
export const createServerSupabaseClient = async () => {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Missing Supabase env vars')
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      ebooks: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          category_id: string
          level_id: string
          author_id: string | null
          price: number
          pages: number
          cover_url: string
          storage_path: string | null
          external_url: string | null
          version: number
          rating_avg: number
          rating_count: number
          sales_count: number
          active: boolean
          featured: boolean
          meta_title: string | null
          meta_description: string | null
          gallery_images: string[] | null
          cover_image_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          category_id: string
          level_id: string
          author_id?: string | null
          price: number
          pages: number
          cover_url: string
          storage_path?: string | null
          external_url?: string | null
          version?: number
          rating_avg?: number
          rating_count?: number
          sales_count?: number
          active?: boolean
          featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          gallery_images?: string[] | null
          cover_image_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          category_id?: string
          level_id?: string
          author_id?: string | null
          price?: number
          pages?: number
          cover_url?: string
          storage_path?: string | null
          external_url?: string | null
          version?: number
          rating_avg?: number
          rating_count?: number
          sales_count?: number
          active?: boolean
          featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          gallery_images?: string[] | null
          cover_image_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          public_token: string
          status: string
          amount: number
          currency: string
          email: string | null
          provider: string
          provider_txn_id: string | null
          metadata: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          public_token: string
          status?: string
          amount: number
          currency?: string
          email?: string | null
          provider?: string
          provider_txn_id?: string | null
          metadata?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          public_token?: string
          status?: string
          amount?: number
          currency?: string
          email?: string | null
          provider?: string
          provider_txn_id?: string | null
          metadata?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          ebook_id: string | null
          combo_id: string | null
          unit_price: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          ebook_id?: string | null
          combo_id?: string | null
          unit_price: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          ebook_id?: string | null
          combo_id?: string | null
          unit_price?: number
          quantity?: number
          created_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          order_id: string
          ebook_id: string
          download_quota: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          ebook_id: string
          download_quota?: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          ebook_id?: string
          download_quota?: number
          created_at?: string
        }
      }
      download_tokens: {
        Row: {
          id: string
          license_id: string
          token: string
          expires_at: string
          used_count: number
          created_at: string
        }
        Insert: {
          id?: string
          license_id: string
          token: string
          expires_at: string
          used_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          license_id?: string
          token?: string
          expires_at?: string
          used_count?: number
          created_at?: string
        }
      }
    }
  }
}
