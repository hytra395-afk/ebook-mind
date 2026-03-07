import { getSupabaseAdmin } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

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
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Combos</h1>
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
              <th className="px-6 py-3 font-medium">Trạng thái</th>
              <th className="px-6 py-3 font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {combos?.map((combo: any) => (
              <tr key={combo.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 text-sm">{combo.title}</p>
                  <p className="text-xs text-gray-400">{combo.slug}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{combo.combo_items?.length || 0}</td>
                <td className="px-6 py-4 text-sm font-semibold">{new Intl.NumberFormat('vi-VN').format(combo.price)}đ</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    combo.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {combo.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/combos/${combo.id}`} className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800">
                    <Pencil className="h-3.5 w-3.5" /> Sửa
                  </Link>
                </td>
              </tr>
            ))}
            {(!combos || combos.length === 0) && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Chưa có combo nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
