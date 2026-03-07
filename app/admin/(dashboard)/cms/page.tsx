import { getSupabaseAdmin } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil, ExternalLink } from 'lucide-react'

export const revalidate = 0

export default async function AdminCmsPage() {
  const supabase = getSupabaseAdmin()
  const { data: landingPages } = await supabase
    .from('ebook_pages')
    .select('*, ebooks(title, slug)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CMS - Trang giới thiệu Ebook</h1>
          <p className="text-sm text-gray-500 mt-1">Tạo landing page riêng cho từng ebook</p>
        </div>
        <Link
          href="/admin/cms/new"
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          <Plus className="h-4 w-4" /> Tạo Landing Page
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
              <th className="px-6 py-3 font-medium">Ebook</th>
              <th className="px-6 py-3 font-medium">Tiêu đề</th>
              <th className="px-6 py-3 font-medium">Trạng thái</th>
              <th className="px-6 py-3 font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {landingPages?.map((page: any) => (
              <tr key={page.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.ebooks?.title || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.title || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    page.status === 'published' ? 'bg-green-50 text-green-700' : page.status === 'archived' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {page.status === 'published' ? 'Published' : page.status === 'archived' ? 'Archived' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link href={`/admin/cms/${page.ebook_id}`} className="text-purple-600 hover:text-purple-800">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  {page.ebooks?.slug && (
                    <Link href={`/ebooks/${page.ebooks.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
            {(!landingPages || landingPages.length === 0) && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">Chưa có landing page nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
