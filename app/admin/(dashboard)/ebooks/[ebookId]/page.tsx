'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, Save, Send, Eye, BookOpen, Image as ImageIcon, FileText, User, Star, Search } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ImageGalleryInput from '@/components/admin/image-gallery-input'
import HighlightsInput from '@/components/admin/highlights-input'
import ReviewsManager from '@/components/admin/reviews-manager'
import SEOPanel from '@/components/admin/seo-panel'
import AuthorInput from '@/components/admin/author-input'
import DeleteButton from '@/components/admin/delete-button'
import { convertDriveUrl } from '@/lib/utils'

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

export default function EditEbookPage() {
  const supabase = getClient()
  const router = useRouter()
  const params = useParams()
  const ebookId = params.ebookId as string
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [categories, setCategories] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])
  const [form, setForm] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const { adminGet } = await import('@/lib/admin-api')
        const [ebookRes, catRes, lvlRes, reviewsRes] = await Promise.all([
          adminGet(`/api/admin/ebooks/${ebookId}`),
          supabase.from('categories').select('*'),
          supabase.from('levels').select('*').order('sort_order'),
          supabase.from('reviews').select('*').eq('ebook_id', ebookId).order('created_at', { ascending: false }),
        ])
        if (ebookRes.ebook) {
          const ebook = ebookRes.ebook
          setForm({
            ...ebook,
            highlights: ebook.highlights || [],
            preview_images: ebook.preview_images || [],
            keywords: ebook.keywords || [],
            author_name: ebook.author_name || '',
            author_title: ebook.author_title || '',
            author_bio: ebook.author_bio || '',
            author_avatar: ebook.author_avatar || '',
            content: ebook.content || '',
            meta_title: ebook.meta_title || '',
            meta_description: ebook.meta_description || '',
            og_image_url: ebook.og_image_url || '',
            rating_avg: ebook.rating_avg || 0,
            rating_count: ebook.rating_count || 0,
            sales_count: ebook.sales_count || 0,
            status: ebook.status || 'published',
            bestseller: ebook.bestseller || false,
          })
        }
        setCategories(catRes.data || [])
        setLevels(lvlRes.data || [])
        setReviews(reviewsRes.data || [])
      } catch (error) {
        console.error('Error loading ebook:', error)
        alert('Lỗi khi tải ebook')
      }
    }
    load()
  }, [ebookId])

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.category_id || !form.level_id || !form.price) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      setActiveTab('basic')
      return
    }

    setLoading(true)
    try {
      const { adminPut } = await import('@/lib/admin-api')
      await adminPut(`/api/admin/ebooks/${ebookId}`, {
        ...form,
        status,
        price: Number(form.price),
        pages: Number(form.pages) || 0,
        rating_avg: Number(form.rating_avg),
        rating_count: Number(form.rating_count),
        sales_count: Number(form.sales_count),
        reviews,
      })
      router.push('/admin/ebooks')
      router.refresh()
    } catch (err: any) {
      alert('Lỗi: ' + (err.message || 'Không thể cập nhật ebook'))
    }
    setLoading(false)
  }

  const handleDeleteSuccess = () => {
    router.push('/admin/ebooks')
    router.refresh()
  }

  if (!form) return <div className="text-center py-20 text-gray-400">Đang tải...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/ebooks" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sửa Ebook</h1>
            <p className="text-sm text-gray-500">{form.title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <DeleteButton
            itemId={ebookId}
            itemType="ebook"
            itemTitle={form.title}
            onDelete={handleDeleteSuccess}
            variant="button"
          />
          <Link
            href={`/ebooks/${form.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <Eye className="w-4 h-4" /> Xem trước
          </Link>
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
            <Send className="w-4 h-4" /> Cập nhật
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
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={form.slug || ''}
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
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={form.category_id || ''}
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
                  value={form.level_id || ''}
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
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
                <input
                  type="number"
                  value={form.pages || ''}
                  onChange={(e) => setForm({ ...form, pages: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link PDF *</label>
                <input
                  type="url"
                  value={form.external_url || ''}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active || false}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span className="text-sm text-gray-700">Active (hiển thị trên website)</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg hover:bg-purple-50 transition">
                  <input
                    type="checkbox"
                    checked={form.featured || false}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded text-purple-600 mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Nổi bật (Featured)</span>
                    <p className="text-xs text-gray-500 mt-0.5">Hiển thị trong mục "Ebook Nổi Bật" trên trang chủ</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg hover:bg-orange-50 transition">
                  <input
                    type="checkbox"
                    checked={form.bestseller || false}
                    onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
                    className="rounded text-orange-600 mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Bestseller</span>
                    <p className="text-xs text-gray-500 mt-0.5">Hiển thị nhãn "Bestseller" trên card ebook (không ảnh hưởng trang chủ)</p>
                  </div>
                </label>
              </div>
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
                value={form.cover_url || ''}
                onChange={(e) => setForm({ ...form, cover_url: convertDriveUrl(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://drive.google.com/... hoặc URL ảnh trực tiếp"
              />
              {form.cover_url && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border">
                  <p className="text-xs text-gray-500 mb-2">Preview ảnh bìa:</p>
                  <div className="relative w-40 h-60">
                    <img
                      src={form.cover_url}
                      alt="Cover preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-purple-200 shadow-md"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23f3f4f6" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23d1d5db" font-size="14"%3ELỗi tải ảnh%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Kích thước khuyến nghị: 400×600px (tỷ lệ 2:3)</p>
                  <p className="text-xs text-purple-600 mt-1 font-mono break-all">{form.cover_url}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ảnh Preview (Album xem trước nội dung)
              </label>
              <ImageGalleryInput
                images={form.preview_images || []}
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
                highlights={form.highlights || []}
                onChange={(highlights) => setForm({ ...form, highlights })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Giới thiệu chi tiết (Nội dung mô tả đầy đủ)
              </label>
              <RichTextEditor
                content={form.content || ''}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Viết nội dung giới thiệu chi tiết về ebook..."
              />
            </div>
          </div>
        )}

        {/* Tab: Author */}
        {activeTab === 'author' && (
          <div className="max-w-3xl">
            <AuthorInput
              authorName={form.author_name || ''}
              authorTitle={form.author_title || ''}
              authorBio={form.author_bio || ''}
              authorAvatar={form.author_avatar || ''}
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
              ratingAvg={form.rating_avg || 0}
              ratingCount={form.rating_count || 0}
              salesCount={form.sales_count || 0}
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
              title={form.title || ''}
              description={form.description || ''}
              slug={form.slug || ''}
              coverUrl={form.cover_url || ''}
              metaTitle={form.meta_title || ''}
              metaDescription={form.meta_description || ''}
              ogImageUrl={form.og_image_url || ''}
              keywords={form.keywords || []}
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
