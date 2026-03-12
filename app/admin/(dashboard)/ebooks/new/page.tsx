'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, Save, Send, Eye, BookOpen, Image as ImageIcon, FileText, User, Star, Search } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ImageGalleryInput from '@/components/admin/image-gallery-input'
import HighlightsInput from '@/components/admin/highlights-input'
import ReviewsManager from '@/components/admin/reviews-manager'
import SEOPanel from '@/components/admin/seo-panel'
import AuthorInput from '@/components/admin/author-input'

const RichTextEditor = dynamic(() => import('@/components/admin/rich-text-editor'), { ssr: false })

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const tabs = [
  { id: 'basic', label: 'Thông tin cơ bản', icon: BookOpen },
  { id: 'media', label: 'Ảnh & Media', icon: ImageIcon },
  { id: 'content', label: 'Nội dung', icon: FileText },
  { id: 'author', label: 'Tác giả', icon: User },
  { id: 'reviews', label: 'Đánh giá', icon: Star },
  { id: 'seo', label: 'SEO', icon: Search },
]

export default function NewEbookPage() {
  const supabase = getClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [categories, setCategories] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    level_id: '',
    price: '',
    pages: '',
    cover_url: '',
    external_url: '',
    active: true,
    featured: false,
    status: 'draft',
    // New fields
    highlights: [] as string[],
    content: '',
    preview_images: [] as string[],
    author_name: '',
    author_title: '',
    author_bio: '',
    author_avatar: '',
    og_image_url: '',
    meta_title: '',
    meta_description: '',
    keywords: [] as string[],
    rating_avg: 0,
    rating_count: 0,
    sales_count: 0,
  })

  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      supabase.from('categories').select('*'),
      supabase.from('levels').select('*').order('sort_order'),
    ]).then(([catRes, lvlRes]) => {
      setCategories(catRes.data || [])
      setLevels(lvlRes.data || [])
    })
  }, [])

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.category_id || !form.level_id || !form.price) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      setActiveTab('basic')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/ebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status,
          price: Number(form.price),
          pages: Number(form.pages) || 0,
          rating_avg: Number(form.rating_avg),
          rating_count: Number(form.rating_count),
          sales_count: Number(form.sales_count),
          reviews,
        }),
      })
      const data = await res.json()
      if (!res.ok) { 
        alert('Lỗi: ' + data.error)
        setLoading(false)
        return 
      }
      router.push('/admin/ebooks')
      router.refresh()
    } catch (err) {
      alert('Lỗi kết nối')
    }
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/ebooks" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thêm Ebook Mới</h1>
            <p className="text-sm text-gray-500">Tạo ebook với đầy đủ thông tin</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {form.slug ? (
            <Link
              href={`/ebooks/${form.slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <Eye className="w-4 h-4" /> Xem trước
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title="Vui lòng lưu ebook trước khi xem trước"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
            >
              <Eye className="w-4 h-4" /> Xem trước
            </button>
          )}
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Lưu nháp
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Đăng bài
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border p-6">
        {/* Tab: Basic Info */}
        {activeTab === 'basic' && (
          <div className="space-y-5 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên ebook *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="VD: Khởi nghiệp thành công"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">URL: ebookmind.com/ebooks/{form.slug || 'slug'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn *</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Mô tả ngắn gọn về ebook (hiển thị ở trang danh sách)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Chọn category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                <select
                  value={form.level_id}
                  onChange={(e) => setForm({ ...form, level_id: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Chọn level</option>
                  {levels.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="49000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
                <input
                  type="number"
                  value={form.pages}
                  onChange={(e) => setForm({ ...form, pages: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link PDF *</label>
                <input
                  type="url"
                  value={form.external_url}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span className="text-sm text-gray-700">Active (hiển thị trên website)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span className="text-sm text-gray-700">Featured (nổi bật)</span>
              </label>
            </div>
          </div>
        )}

        {/* Tab: Media */}
        {activeTab === 'media' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa (Cover) *</label>
              <input
                type="url"
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://drive.google.com/... hoặc URL ảnh trực tiếp"
              />
              {form.cover_url && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border">
                  <p className="text-xs text-gray-500 mb-2">Preview ảnh bìa:</p>
                  <img
                    src={form.cover_url}
                    alt="Cover preview"
                    className="w-40 h-60 object-cover rounded-lg border-2 border-purple-200 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      alert('Không thể tải ảnh. Vui lòng kiểm tra URL.')
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-2">Kích thước khuyến nghị: 400×600px (tỷ lệ 2:3)</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ảnh Preview (Album xem trước nội dung)
              </label>
              <ImageGalleryInput
                images={form.preview_images}
                onChange={(images) => setForm({ ...form, preview_images: images })}
                maxImages={10}
              />
            </div>
          </div>
        )}

        {/* Tab: Content */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Điểm nổi bật</label>
              <HighlightsInput
                highlights={form.highlights}
                onChange={(highlights) => setForm({ ...form, highlights })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Giới thiệu chi tiết (Nội dung mô tả đầy đủ)
              </label>
              <RichTextEditor
                content={form.content}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Viết nội dung giới thiệu chi tiết về ebook... (hỗ trợ H1-H4, bold, italic, link, ảnh)"
              />
            </div>
          </div>
        )}

        {/* Tab: Author */}
        {activeTab === 'author' && (
          <div className="max-w-3xl">
            <AuthorInput
              authorName={form.author_name}
              authorTitle={form.author_title}
              authorBio={form.author_bio}
              authorAvatar={form.author_avatar}
              onAuthorNameChange={(v) => setForm({ ...form, author_name: v })}
              onAuthorTitleChange={(v) => setForm({ ...form, author_title: v })}
              onAuthorBioChange={(v) => setForm({ ...form, author_bio: v })}
              onAuthorAvatarChange={(v) => setForm({ ...form, author_avatar: v })}
            />
          </div>
        )}

        {/* Tab: Reviews */}
        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            <ReviewsManager
              reviews={reviews}
              onChange={setReviews}
              ratingAvg={form.rating_avg}
              ratingCount={form.rating_count}
              salesCount={form.sales_count}
              onStatsChange={(stats) => setForm({ 
                ...form, 
                rating_avg: stats.ratingAvg,
                rating_count: stats.ratingCount,
                sales_count: stats.salesCount
              })}
            />
          </div>
        )}

        {/* Tab: SEO */}
        {activeTab === 'seo' && (
          <div className="max-w-3xl">
            <SEOPanel
              title={form.title}
              description={form.description}
              slug={form.slug}
              coverUrl={form.cover_url}
              metaTitle={form.meta_title}
              metaDescription={form.meta_description}
              ogImageUrl={form.og_image_url}
              keywords={form.keywords}
              onMetaTitleChange={(v) => setForm({ ...form, meta_title: v })}
              onMetaDescriptionChange={(v) => setForm({ ...form, meta_description: v })}
              onOgImageChange={(v) => setForm({ ...form, og_image_url: v })}
              onKeywordsChange={(v) => setForm({ ...form, keywords: v })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
