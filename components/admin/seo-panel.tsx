'use client'

import { useState, useEffect } from 'react'
import { Search, CheckCircle, AlertCircle, Info, Eye } from 'lucide-react'

interface SEOPanelProps {
  title: string
  description: string
  slug: string
  coverUrl: string
  metaTitle: string
  metaDescription: string
  ogImageUrl: string
  keywords: string[]
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
  onOgImageChange: (value: string) => void
  onKeywordsChange: (value: string[]) => void
}

export default function SEOPanel({
  title,
  description,
  slug,
  coverUrl,
  metaTitle,
  metaDescription,
  ogImageUrl,
  keywords,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onOgImageChange,
  onKeywordsChange
}: SEOPanelProps) {
  const [keywordInput, setKeywordInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  // Auto-generate SEO fields
  const autoGenerateMetaTitle = () => {
    const generated = `${title} - Ebook Mind`.slice(0, 60)
    onMetaTitleChange(generated)
  }

  const autoGenerateMetaDescription = () => {
    const generated = description.slice(0, 160)
    onMetaDescriptionChange(generated)
  }

  const autoGenerateOgImage = () => {
    onOgImageChange(coverUrl)
  }

  const autoGenerateKeywords = () => {
    const words = title.toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 5)
    onKeywordsChange([...new Set([...keywords, ...words])])
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      onKeywordsChange([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(keywords.filter(k => k !== keyword))
  }

  // Calculate SEO Score
  const calculateSEOScore = () => {
    let score = 0
    const checks: { label: string; passed: boolean; tip: string }[] = []

    // Title length (50-60 chars)
    const titleLen = (metaTitle || title).length
    const titleOk = titleLen >= 50 && titleLen <= 60
    checks.push({
      label: `Meta Title (${titleLen}/60 ký tự)`,
      passed: titleOk,
      tip: titleOk ? 'Độ dài tốt' : titleLen < 50 ? 'Nên dài hơn 50 ký tự' : 'Nên ngắn hơn 60 ký tự'
    })
    if (titleOk) score += 20

    // Description length (150-160 chars)
    const descLen = (metaDescription || description).length
    const descOk = descLen >= 150 && descLen <= 160
    checks.push({
      label: `Meta Description (${descLen}/160 ký tự)`,
      passed: descOk,
      tip: descOk ? 'Độ dài tốt' : descLen < 150 ? 'Nên dài hơn 150 ký tự' : 'Nên ngắn hơn 160 ký tự'
    })
    if (descOk) score += 20

    // Has cover image
    const hasImage = !!(ogImageUrl || coverUrl)
    checks.push({
      label: 'OG Image',
      passed: hasImage,
      tip: hasImage ? 'Đã có ảnh OG' : 'Thêm ảnh OG để hiển thị đẹp khi share'
    })
    if (hasImage) score += 20

    // Has keywords
    const hasKeywords = keywords.length >= 3
    checks.push({
      label: `Keywords (${keywords.length} từ khóa)`,
      passed: hasKeywords,
      tip: hasKeywords ? 'Đủ từ khóa' : 'Nên có ít nhất 3 từ khóa'
    })
    if (hasKeywords) score += 20

    // Slug is clean
    const slugOk = !!(slug && !slug.includes(' ') && slug.length > 5)
    checks.push({
      label: 'URL Slug',
      passed: slugOk,
      tip: slugOk ? 'Slug tốt' : 'Slug nên dài hơn 5 ký tự và không có khoảng trắng'
    })
    if (slugOk) score += 20

    return { score, checks }
  }

  const { score, checks } = calculateSEOScore()

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 bg-green-50'
    if (s >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Điểm SEO
          </h3>
          <div className={`text-2xl font-bold px-4 py-1 rounded-full ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </div>

        <div className="space-y-2">
          {checks.map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {check.passed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={check.passed ? 'text-gray-700' : 'text-gray-500'}>
                {check.label}
              </span>
              <span className="text-xs text-gray-400">— {check.tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Meta Title</label>
          <button
            type="button"
            onClick={autoGenerateMetaTitle}
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            Tự động tạo
          </button>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder={`${title} - Ebook Mind`}
          maxLength={60}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/60 ký tự</p>
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
          <button
            type="button"
            onClick={autoGenerateMetaDescription}
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            Tự động tạo
          </button>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder={description.slice(0, 160)}
          maxLength={160}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">{metaDescription.length}/160 ký tự</p>
      </div>

      {/* OG Image */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
          <button
            type="button"
            onClick={autoGenerateOgImage}
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            Dùng ảnh bìa
          </button>
        </div>
        <input
          type="url"
          value={ogImageUrl}
          onChange={(e) => onOgImageChange(e.target.value)}
          placeholder={coverUrl || 'https://...'}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Keywords */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Keywords</label>
          <button
            type="button"
            onClick={autoGenerateKeywords}
            className="text-xs text-purple-600 hover:text-purple-700"
          >
            Gợi ý từ tiêu đề
          </button>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
            placeholder="Thêm từ khóa..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-sm"
            >
              {kw}
              <button
                type="button"
                onClick={() => removeKeyword(kw)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Google Preview */}
      <div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Ẩn' : 'Xem'} preview Google
        </button>

        {showPreview && (
          <div className="mt-3 p-4 bg-white border rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Kết quả tìm kiếm Google</p>
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {metaTitle || `${title} - Ebook Mind`}
            </div>
            <div className="text-green-700 text-sm">
              ebookmind.com › ebooks › {slug}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {metaDescription || description.slice(0, 160)}
            </div>
          </div>
        )}
      </div>

      {/* Schema Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Schema Markup (JSON-LD)</span>
        </div>
        <pre className="text-xs text-gray-500 overflow-auto max-h-32">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Book",
  "name": title,
  "description": metaDescription || description.slice(0, 160),
  "image": ogImageUrl || coverUrl,
  "url": `https://ebookmind.com/ebooks/${slug}`,
  "keywords": keywords.join(", ")
}, null, 2)}
        </pre>
      </div>
    </div>
  )
}
