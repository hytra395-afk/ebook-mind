import { getSupabaseAdmin } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Star } from 'lucide-react'
import DeleteButton from '@/components/admin/delete-button'

export const revalidate = 0

export default async function AdminCombosPage() {
  const supabase = getSupabaseAdmin()
  const { data: combos } = await supabase
    .from('combos')
    .select('*, combo_items(id)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Combos</h1>
          <p className="text-sm text-gray-500">Tạo và quản lý combo ebook với giá ưu đãi</p>
        </div>
        <Link
          href="/admin/combos/new"
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          <Plus className="h-4 w-4" /> Thêm Combo
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
              <th className="px-6 py-3 font-medium">Combo</th>
              <th className="px-6 py-3 font-medium">Số ebook</th>
              <th className="px-6 py-3 font-medium">Giá</th>
              <th className="px-6 py-3 font-medium">Đánh giá</th>
              <th className="px-6 py-3 font-medium">Trạng thái</th>
              <th className="px-6 py-3 font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {combos?.map((combo: any) => (
              <tr key={combo.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {combo.cover_url && (
                      <div className="relative w-10 h-14 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={combo.cover_url} alt={combo.title} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{combo.title}</p>
                      <p className="text-xs text-gray-400">{combo.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{combo.combo_items?.length || 0} ebooks</td>
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{new Intl.NumberFormat('vi-VN').format(combo.price)}đ</td>
                <td className="px-6 py-4">
                  {combo.rating_avg > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{Number(combo.rating_avg).toFixed(1)}</span>
                      <span className="text-xs text-gray-400">({combo.rating_count})</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    combo.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {combo.active ? 'Active' : 'Inactive'}
                  </span>
                  {combo.featured && (
                    <span className="ml-1 text-xs font-medium px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/combos/${combo.id}`} className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800">
                      <Pencil className="h-3.5 w-3.5" /> Sửa
                    </Link>
                    <DeleteButton
                      itemId={combo.id}
                      itemType="combo"
                      itemTitle={combo.title}
                      variant="text"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {(!combos || combos.length === 0) && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">Chưa có combo nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
