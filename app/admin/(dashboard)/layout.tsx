import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import AdminSidebar from '@/components/admin/sidebar'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

async function verifyAdminAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value || cookieStore.get('supabase-auth-token')?.value
  
  if (!token) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  // Check admin role
  const isAdmin = 
    user.role === 'admin' ||
    user.user_metadata?.role === 'admin' ||
    user.app_metadata?.role === 'admin'

  if (!isAdmin) {
    return null
  }

  return user
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await verifyAdminAuth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
