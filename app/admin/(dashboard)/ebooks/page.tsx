import { getSupabaseAdmin } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from '@/components/admin/delete-button'
import { convertDriveUrl } from '@/lib/utils'

export const revalidate = 0

export default async function AdminEbooksPage() {
  const supabase = getSupabaseAdmin()
  const { data: ebooks } = await supabase
    .from('ebooks')
    .select('*, categories(name), subcategories(name, icon), levels(name), authors(name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Ebooks</h1>
        <Link
          href="/admin/ebooks/new"
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          <Plus className="h-4 w-4" /> Thêm Ebook
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Ebook</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Subcategory</th>
                <th className="px-6 py-3 font-medium">Giá</th>
                <th className="px-6 py-3 font-medium">Đã bán</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {ebooks?.map((ebook: any) => (
                <tr key={ebook.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-14 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        {ebook.cover_url && (
                          <Image src={convertDriveUrl(ebook.cover_url)} alt={ebook.title} fill className="object-cover" unoptimized={true} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{ebook.title}</p>
                        <p className="text-xs text-gray-400">{ebook.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ebook.categories?.name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {ebook.subcategories ? (
                      <span className="inline-flex items-center gap-1">
                        {ebook.subcategories.icon && <span>{ebook.subcategories.icon}</span>}
                        <span>{ebook.subcategories.name}</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">{new Intl.NumberFormat('vi-VN').format(ebook.price)}đ</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ebook.sales_count}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      ebook.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {ebook.active ? 'Active' : 'Inactive'}
                    </span>
                    {ebook.featured && (
                      <span className="ml-1 text-xs font-medium px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/ebooks/${ebook.id}`}
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Sửa
                      </Link>
                      <DeleteButton
                        itemId={ebook.id}
                        itemType="ebook"
                        itemTitle={ebook.title}
                        variant="text"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {(!ebooks || ebooks.length === 0) && (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400">Chưa có ebook nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
