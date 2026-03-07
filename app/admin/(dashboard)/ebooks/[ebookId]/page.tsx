'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function EditEbookPage() {
  const supabase = getClient()
  const router = useRouter()
  const params = useParams()
  const ebookId = params.ebookId as string
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const [ebookRes, catRes, lvlRes, authRes] = await Promise.all([
        fetch(`/api/admin/ebooks/${ebookId}`).then(r => r.json()),
        supabase.from('categories').select('*'),
        supabase.from('levels').select('*').order('sort_order'),
        supabase.from('authors').select('*'),
      ])
      if (ebookRes.ebook) setForm(ebookRes.ebook)
      setCategories(catRes.data || [])
      setLevels(lvlRes.data || [])
      setAuthors(authRes.data || [])
    }
    load()
  }, [ebookId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/ebooks/${ebookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, slug: form.slug, description: form.description,
          category_id: form.category_id, level_id: form.level_id,
          author_id: form.author_id || null,
          price: Number(form.price), pages: Number(form.pages),
          cover_url: form.cover_url, storage_path: form.storage_path,
          active: form.active, featured: form.featured,
        }),
      })
      const data = await res.json()
      if (!res.ok) { alert('Lỗi: ' + data.error); setLoading(false); return }
      router.push('/admin/ebooks')
      router.refresh()
    } catch { alert('Lỗi kết nối') }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Bạn chắc chắn muốn xóa ebook này?')) return
    await fetch(`/api/admin/ebooks/${ebookId}`, { method: 'DELETE' })
    router.push('/admin/ebooks')
    router.refresh()
  }

  if (!form) return <div className="text-center py-20 text-gray-400">Đang tải...</div>

  return (
    <div>
      <Link href="/admin/ebooks" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 mb-4">
        <ArrowLeft className="h-4 w-4" /> Quay lại
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sửa Ebook</h1>
        <button onClick={handleDelete} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4" /> Xóa
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 max-w-3xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên ebook *</label>
            <input type="text" required value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input type="text" required value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
          <textarea required rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select required value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">Chọn category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
            <select required value={form.level_id || ''} onChange={(e) => setForm({ ...form, level_id: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">Chọn level</option>
              {levels.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <select value={form.author_id || ''} onChange={(e) => setForm({ ...form, author_id: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="">Chọn author</option>
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND) *</label>
            <input type="number" required value={form.price || ''} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số trang *</label>
            <input type="number" required value={form.pages || ''} onChange={(e) => setForm({ ...form, pages: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover URL *</label>
          <input type="url" required value={form.cover_url || ''} onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File PDF URL</label>
          <input type="text" value={form.storage_path || ''} onChange={(e) => setForm({ ...form, storage_path: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active || false} onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded text-purple-600" />
            <span className="text-sm text-gray-700">Active</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded text-purple-600" />
            <span className="text-sm text-gray-700">Featured</span>
          </label>
        </div>

        <button type="submit" disabled={loading}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50">
          {loading ? 'Đang lưu...' : 'Cập nhật Ebook'}
        </button>
      </form>
    </div>
  )
}
