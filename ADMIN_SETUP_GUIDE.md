# Admin Setup Guide - Ebook Mind Security

## 🔐 Overview

This guide explains how to set up admin authentication after implementing the security fixes. All admin API endpoints now require authentication with Supabase JWT tokens.

## 📋 Prerequisites

- Supabase project set up
- Admin user accounts created in Supabase Auth
- Access to Supabase SQL Editor

## 🚀 Setup Steps

### Step 1: Run Database Migration

1. Open Supabase SQL Editor
2. Run the security migration:

```sql
-- File: migrations/008_security_rls_policies.sql
-- Copy and paste the entire file content into SQL Editor
-- This will:
-- - Enable RLS on combo_reviews
-- - Create is_admin() function
-- - Add all RLS policies
```

### Step 2: Create Admin Users

#### Option A: Grant Admin Role to Existing User

```sql
-- Replace with your admin email
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@ebookmind.com';
```

#### Option B: Create New Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. After creation, run SQL to grant admin role:

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-new-admin@ebookmind.com';
```

### Step 3: Update Frontend Admin Panel

The admin panel needs to authenticate users and include JWT tokens in API requests.

#### 3.1 Add Login Page

Create `/app/admin/login/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      return
    }

    // Check if user is admin
    const isAdmin = 
      data.user?.role === 'admin' ||
      data.user?.user_metadata?.role === 'admin' ||
      data.user?.app_metadata?.role === 'admin'

    if (!isAdmin) {
      setError('Unauthorized - Admin access required')
      await supabase.auth.signOut()
      return
    }

    // Store session
    localStorage.setItem('supabase.auth.token', data.session?.access_token || '')
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
```

#### 3.2 Create Auth Helper

Create `/lib/admin-client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getAdminToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
}

export async function adminFetch(url: string, options: RequestInit = {}) {
  const token = await getAdminToken()
  
  if (!token) {
    throw new Error('Not authenticated')
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function checkAdminAuth() {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false
  
  const isAdmin = 
    user.role === 'admin' ||
    user.user_metadata?.role === 'admin' ||
    user.app_metadata?.role === 'admin'
  
  return isAdmin
}
```

#### 3.3 Update Admin API Calls

Replace all admin API calls to use `adminFetch`:

```typescript
// Before:
const response = await fetch('/api/admin/ebooks')

// After:
import { adminFetch } from '@/lib/admin-client'
const response = await adminFetch('/api/admin/ebooks')
```

#### 3.4 Add Auth Check to Admin Pages

Add to all admin pages:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminAuth } from '@/lib/admin-client'

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAdminAuth().then(isAdmin => {
      if (!isAdmin) {
        router.push('/admin/login')
      } else {
        setIsAuthorized(true)
      }
    })
  }, [router])

  if (!isAuthorized) {
    return <div>Loading...</div>
  }

  return (
    // Your admin page content
  )
}
```

### Step 4: Test Admin Access

#### 4.1 Test Login

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Should redirect to `/admin/dashboard`

#### 4.2 Test API Access

```bash
# Get admin token from browser localStorage or Supabase
TOKEN="your-jwt-token-here"

# Test protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
  https://ebookmind.com/api/admin/ebooks

# Should return ebooks list if authorized
# Should return 401/403 if not authorized
```

#### 4.3 Test Unauthorized Access

```bash
# Without token
curl https://ebookmind.com/api/admin/ebooks
# Should return: {"error":"Missing or invalid authorization header"}

# With invalid token
curl -H "Authorization: Bearer invalid-token" \
  https://ebookmind.com/api/admin/ebooks
# Should return: {"error":"Invalid or expired token"}

# With non-admin user token
curl -H "Authorization: Bearer <non-admin-token>" \
  https://ebookmind.com/api/admin/ebooks
# Should return: {"error":"Insufficient permissions - admin role required"}
```

## 🔒 Security Best Practices

### 1. Password Security
- Use strong passwords for admin accounts
- Enable 2FA in Supabase (if available)
- Rotate passwords regularly

### 2. Token Management
- Tokens expire after 1 hour by default
- Implement token refresh logic
- Clear tokens on logout

### 3. Session Management
```typescript
// Logout function
export async function adminLogout() {
  await supabase.auth.signOut()
  localStorage.removeItem('supabase.auth.token')
  window.location.href = '/admin/login'
}
```

### 4. HTTPS Only
- Always use HTTPS in production
- Set secure cookie flags
- Enable HSTS headers

## 🐛 Troubleshooting

### Issue: "Missing or invalid authorization header"

**Solution**: Ensure you're including the Authorization header:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Issue: "Insufficient permissions"

**Solution**: Check user has admin role:
```sql
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

Should show: `{"role": "admin"}`

### Issue: "Invalid or expired token"

**Solution**: Token may have expired. Re-login to get new token.

### Issue: RLS policies blocking admin

**Solution**: Admin APIs use service role key which bypasses RLS. Check `getSupabaseAdmin()` is being used in API routes.

## 📝 Migration Checklist

- [ ] Run database migration (008_security_rls_policies.sql)
- [ ] Grant admin role to users
- [ ] Create admin login page
- [ ] Update all admin API calls to include auth token
- [ ] Add auth checks to admin pages
- [ ] Test login flow
- [ ] Test API access with valid token
- [ ] Test API access without token (should fail)
- [ ] Test API access with non-admin user (should fail)
- [ ] Deploy to production
- [ ] Verify Supabase Security Advisor shows 0 errors

## 🚨 Important Notes

1. **Service Role Key**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code. It's only used in server-side API routes.

2. **Anon Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose. It's used for client-side auth.

3. **RLS Bypass**: Service role key bypasses all RLS policies. This is why admin APIs can read/write all data.

4. **Frontend Protection**: Admin pages should check auth, but real security is enforced by API endpoints.

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🆘 Support

If you encounter issues:
1. Check Supabase logs for errors
2. Verify environment variables are set
3. Test with Supabase SQL Editor
4. Review SECURITY_AUDIT_SUMMARY.md for implementation details
