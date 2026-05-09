'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, Save, Send, Eye, Package, Image as ImageIcon, FileText, Star, Search, Plus, X } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ImageGalleryInput from '@/components/admin/image-gallery-input'
import HighlightsInput from '@/components/admin/highlights-input'
import ReviewsManager from '@/components/admin/reviews-manager'
import SEOPanel from '@/components/admin/seo-panel'
import { convertDriveUrl } from '@/lib/utils'

const RichTextEditor = dynamic(() => import('@/components/admin/rich-text-editor'), { ssr: false })

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const tabs = [
  { id: 'basic', label: 'Thông tin cơ bản', icon: Package },
  { id: 'media', label: 'Ảnh & Nội dung', icon: ImageIcon },
  { id: 'ebooks', label: 'Ebooks trong combo', icon: FileText },
  { id: 'reviews', label: 'Đánh giá', icon: Star },
  { id: 'seo', label: 'SEO', icon: Search },
]

export default function NewComboPage() {
  const supabase = getClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [ebooks, setEbooks] = useState<any[]>([])
  const [selectedEbooks, setSelectedEbooks] = useState<string[]>([])
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    active: true,
    featured: false,
    bestseller: false,
    status: 'draft',
    cover_url: '',
    content: '',
    highlights: [] as string[],
    preview_images: [] as string[],
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
    supabase.from('ebooks').select('id, title, cover_url, price').eq('active', true).then(({ data }) => {
      setEbooks(data || [])
    })
  }, [])

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.price) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      setActiveTab('basic')
      return
    }

    if (selectedEbooks.length === 0) {
      alert('Vui lòng chọn ít nhất 1 ebook cho combo')
      setActiveTab('ebooks')
      return
    }

    setLoading(true)
    try {
      const { adminPost } = await import('@/lib/admin-api')
      await adminPost('/api/admin/combos', {
        ...form,
        status,
        price: Number(form.price),
        rating_avg: Number(form.rating_avg),
        rating_count: Number(form.rating_count),
        sales_count: Number(form.sales_count),
        ebook_ids: selectedEbooks,
        reviews,
      })
      router.push('/admin/combos')
      router.refresh()
    } catch (err: any) {
      alert('Lỗi: ' + (err.message || 'Không thể tạo combo'))
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

  const toggleEbook = (ebookId: string) => {
    setSelectedEbooks(prev => 
      prev.includes(ebookId) 
        ? prev.filter(id => id !== ebookId)
        : [...prev, ebookId]
    )
  }

  const totalOriginalPrice = selectedEbooks.reduce((sum, id) => {
    const ebook = ebooks.find(e => e.id === id)
    return sum + (ebook?.price || 0)
  }, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/combos" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thêm Combo Mới</h1>
            <p className="text-sm text-gray-500">Tạo combo ebook với giá ưu đãi</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={form.slug ? `/combos/${form.slug}` : '#'}
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
            {tab.id === 'ebooks' && selectedEbooks.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                {selectedEbooks.length}
              </span>
            )}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên combo *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="VD: Combo Khởi Nghiệp Toàn Diện"
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
                <p className="text-xs text-gray-400 mt-1">URL: ebookmind.com/combos/{form.slug || 'slug'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn *</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Mô tả ngắn gọn về combo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá combo (VND) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="99000"
                />
                {totalOriginalPrice > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Giá gốc: {new Intl.NumberFormat('vi-VN').format(totalOriginalPrice)}đ
                    {form.price && Number(form.price) < totalOriginalPrice && (
                      <span className="text-green-600 ml-2">
                        (Tiết kiệm {Math.round((1 - Number(form.price) / totalOriginalPrice) * 100)}%)
                      </span>
                    )}
                  </p>
                )}
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
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg hover:bg-purple-50 transition">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-purple-600 mt-1"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Nổi bật (Featured)</span>
                  <p className="text-xs text-gray-500 mt-0.5">Hiển thị trong mục "Combo Nổi Bật" trên trang chủ</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg hover:bg-orange-50 transition">
                <input
                  type="checkbox"
                  checked={form.bestseller}
                  onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
                  className="rounded text-orange-600 mt-1"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Bestseller</span>
                  <p className="text-xs text-gray-500 mt-0.5">Hiển thị nhãn "Bestseller" trên card combo (không ảnh hưởng trang chủ)</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Tab: Media & Content */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="max-w-3xl">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa combo *</label>
              <input
                type="url"
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: convertDriveUrl(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://drive.google.com/file/d/... hoặc URL trực tiếp"
              />
              <p className="text-xs text-gray-400 mt-1">Hỗ trợ Google Drive URL - sẽ tự động chuyển đổi</p>
              {form.cover_url && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <img
                    src={convertDriveUrl(form.cover_url)}
                    alt="Cover preview"
                    className="w-40 h-56 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-2 break-all">URL: {convertDriveUrl(form.cover_url)}</p>
                </div>
              )}
            </div>

            <div className="max-w-3xl">
              <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh preview (Gallery)</label>
              <ImageGalleryInput
                images={form.preview_images}
                onChange={(preview_images) => setForm({ ...form, preview_images })}
              />
            </div>

            <div className="max-w-3xl">
              <label className="block text-sm font-medium text-gray-700 mb-3">Điểm nổi bật</label>
              <HighlightsInput
                highlights={form.highlights}
                onChange={(highlights) => setForm({ ...form, highlights })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mô tả chi tiết combo
              </label>
              <RichTextEditor
                content={form.content}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Viết nội dung mô tả chi tiết về combo..."
              />
            </div>
          </div>
        )}

        {/* Tab: Ebooks */}
        {activeTab === 'ebooks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                Chọn ebooks cho combo ({selectedEbooks.length} đã chọn)
              </h3>
              {selectedEbooks.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedEbooks([])}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Bỏ chọn tất cả
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ebooks.map((ebook) => {
                const isSelected = selectedEbooks.includes(ebook.id)
                return (
                  <div
                    key={ebook.id}
                    onClick={() => toggleEbook(ebook.id)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-12 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      {ebook.cover_url && (
                        <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 line-clamp-2">{ebook.title}</p>
                      <p className="text-sm text-purple-600 font-semibold">
                        {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                )
              })}
            </div>

            {selectedEbooks.length > 0 && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Ebooks đã chọn:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEbooks.map((id) => {
                    const ebook = ebooks.find(e => e.id === id)
                    return ebook ? (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm border"
                      >
                        {ebook.title}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); toggleEbook(id) }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ) : null
                  })}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Tổng giá gốc: <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format(totalOriginalPrice)}đ</span>
                </p>
              </div>
            )}
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
