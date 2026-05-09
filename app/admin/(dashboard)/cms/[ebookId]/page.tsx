'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function EditCmsPage() {
  const supabase = getClient()
  const router = useRouter()
  const params = useParams()
  const ebookId = params.ebookId as string

  const [loading, setLoading] = useState(false)
  const [ebook, setEbook] = useState<any>(null)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    og_image_url: '',
    content: '{}',
  })

  useEffect(() => {
    const fetchData = async () => {
      // Fetch ebook info
      const { data: ebookData } = await supabase
        .from('ebooks')
        .select('id, title, slug')
        .eq('id', ebookId)
        .single()

      if (ebookData) setEbook(ebookData)

      // Fetch existing page or create new
      const { data: page } = await supabase
        .from('ebook_pages')
        .select('*')
        .eq('ebook_id', ebookId)
        .single()

      if (page) {
        setForm({
          title: page.title || '',
          slug: page.slug || '',
          status: page.status || 'draft',
          meta_title: page.meta_title || '',
          meta_description: page.meta_description || '',
          og_image_url: page.og_image_url || '',
          content: JSON.stringify(page.content || {}, null, 2),
        })
      } else if (ebookData) {
        setForm(prev => ({
          ...prev,
          title: ebookData.title,
          slug: ebookData.slug,
        }))
      }
    }
    fetchData()
  }, [ebookId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let contentJson = {}
    try {
      contentJson = JSON.parse(form.content)
    } catch {
      alert('Content JSON không hợp lệ')
      setLoading(false)
      return
    }

    const payload = {
      ebook_id: ebookId,
      title: form.title,
      slug: form.slug,
      status: form.status,
      meta_title: form.meta_title,
      meta_description: form.meta_description,
      og_image_url: form.og_image_url,
      content: contentJson,
      updated_at: new Date().toISOString(),
      ...(form.status === 'published' ? { published_at: new Date().toISOString() } : {}),
    }

    const { error } = await supabase
      .from('ebook_pages')
      .upsert(payload, { onConflict: 'ebook_id' })

    if (error) {
      alert('Lỗi: ' + error.message)
    } else {
      router.push('/admin/cms')
      router.refresh()
    }
    setLoading(false)
  }

  if (!ebook) {
    return <div className="text-center py-10 text-gray-500">Đang tải...</div>
  }

  return (
    <div>
      <Link href="/admin/cms" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Quay lại CMS
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Landing Page: {ebook.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Chỉnh sửa trang giới thiệu cho ebook</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-5 max-w-3xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
          <input type="text" value={form.meta_title} onChange={e => setForm({...form, meta_title: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
          <textarea value={form.meta_description} onChange={e => setForm({...form, meta_description: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg text-sm" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
          <input type="text" value={form.og_image_url} onChange={e => setForm({...form, og_image_url: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (JSON)</label>
          <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg text-sm font-mono" rows={10} />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="gradient-purple text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
            {loading ? 'Đang lưu...' : 'Lưu Landing Page'}
          </button>
          <Link href="/admin/cms" className="px-6 py-2.5 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  )
}
