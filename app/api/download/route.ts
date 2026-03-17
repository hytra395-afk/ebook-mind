import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Get download token and associated ebook
    const { data: downloadToken, error: tokenError } = await supabaseAdmin
      .from('download_tokens')
      .select(`
        *,
        license:licenses (
          *,
          ebook:ebooks (id, title, external_url)
        )
      `)
      .eq('token', token)
      .single()

    if (tokenError || !downloadToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      )
    }

    // Check if token is expired
    if (new Date(downloadToken.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 410 }
      )
    }

    // Get ebook external_url (Drive link)
    const ebook = downloadToken.license?.ebook
    if (!ebook || !ebook.external_url) {
      return NextResponse.json(
        { error: 'Ebook file not found' },
        { status: 404 }
      )
    }

    // Increment used_count
    await supabaseAdmin
      .from('download_tokens')
      .update({
        used_count: (downloadToken.used_count || 0) + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', downloadToken.id)

    // Redirect to Google Drive link
    return NextResponse.redirect(ebook.external_url)

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
