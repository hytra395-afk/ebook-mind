# 🔒 Security Documentation - Ebook Mind

## 📋 Tổng Quan Bảo Mật

Dự án Ebook Mind được thiết kế với nhiều lớp bảo mật để bảo vệ dữ liệu khách hàng và hệ thống.

---

## 🔐 1. QUẢN LÝ SECRETS & API KEYS

### ✅ Nguyên Tắc Quan Trọng

**KHÔNG BAO GIỜ:**
- ❌ Commit file `.env` hoặc `.env.local` vào Git
- ❌ Hardcode API keys trong source code
- ❌ Để lộ secrets trong documentation files (.md)
- ❌ Share secrets qua email, chat, hoặc public channels

**LUÔN LUÔN:**
- ✅ Sử dụng environment variables cho tất cả secrets
- ✅ Lưu secrets trong Vercel Environment Variables (production)
- ✅ Sử dụng `.env.example` làm template (không chứa giá trị thật)
- ✅ Rotate (thay đổi) API keys định kỳ hoặc khi nghi ngờ bị lộ

### 🔑 Danh Sách Secrets Cần Bảo Vệ

```env
# CRITICAL - KHÔNG BAO GIỜ LỘ
SUPABASE_SERVICE_ROLE_KEY=xxx        # Full database access
SEPAY_API_KEY=xxx                     # Payment gateway access
SEPAY_WEBHOOK_SECRET=xxx              # Webhook verification
BREVO_API_KEY=xxx                     # Email service access
GMAIL_APP_PASSWORD=xxx                # Email backup access

# PUBLIC - An toàn để public (nhưng nên hạn chế)
NEXT_PUBLIC_SUPABASE_URL=xxx          # Database URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx     # Row Level Security protected
```

### 🛡️ Supabase Row Level Security (RLS)

**Quan trọng:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` có thể public vì được bảo vệ bởi RLS policies.

**Các bảng cần RLS:**
- ✅ `ebooks` - Chỉ đọc, admin mới được ghi
- ✅ `orders` - User chỉ thấy order của mình
- ✅ `licenses` - User chỉ thấy license của mình
- ✅ `download_tokens` - Không public, chỉ API server access

**Kiểm tra RLS policies:**
```sql
-- Xem RLS policies hiện tại
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

---

## 🚦 2. RATE LIMITING

### Cấu Hình Hiện Tại

File: `middleware.ts`

```typescript
const RATE_LIMITS = {
  '/api/download': { maxRequests: 10, windowMs: 60000 },      // 10/phút
  '/api/orders/create': { maxRequests: 5, windowMs: 60000 },  // 5/phút
  '/api/sepay/webhook': { maxRequests: 100, windowMs: 60000 }, // 100/phút
  '/api/admin': { maxRequests: 30, windowMs: 60000 },         // 30/phút
}
```

### Lợi Ích
- Chống DDoS attacks
- Chống brute force login
- Chống spam orders/downloads
- Giảm chi phí API calls

### Hạn Chế
- In-memory store (reset khi server restart)
- Không hoạt động với serverless edge functions

**Giải pháp tốt hơn (tương lai):**
- Sử dụng Upstash Redis cho distributed rate limiting
- Implement IP blacklist/whitelist

---

## 🔒 3. AUTHENTICATION & AUTHORIZATION

### Admin Authentication

**Phương thức:** Supabase Auth với role-based access control

```typescript
// lib/auth.ts
export async function verifyAdmin(request: NextRequest) {
  // 1. Verify JWT token
  // 2. Check user role === 'admin'
  // 3. Return user or error
}
```

**Bảo mật:**
- ✅ JWT tokens với expiration
- ✅ Role-based access (admin/user)
- ✅ Server-side verification
- ❌ Không dùng simple password check

### Download Token Security

**Cơ chế:**
1. Tạo random token (32 chars) khi order completed
2. Token expires sau 48 giờ
3. Token chỉ dùng được với license ID tương ứng
4. Track `used_count` để phát hiện abuse

```typescript
// Tạo token
const downloadToken = nanoid(32)
const expiresAt = new Date()
expiresAt.setHours(expiresAt.getHours() + 48)
```

---

## 🛡️ 4. SECURITY HEADERS

### Content Security Policy (CSP)

File: `middleware.ts`

```typescript
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
  "img-src 'self' data: https: http:",
  "connect-src 'self' https://*.supabase.co",
  // ...
].join('; ')
```

### Additional Headers

```typescript
'X-Content-Type-Options': 'nosniff'           // Chống MIME sniffing
'X-Frame-Options': 'DENY'                     // Chống clickjacking
'X-XSS-Protection': '1; mode=block'           // XSS protection
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Permissions-Policy': 'camera=(), microphone=()' // Disable unused APIs
```

---

## 🔍 5. INPUT VALIDATION & SANITIZATION

### Validation Library

File: `lib/validation.ts` - Sử dụng `zod` schema validation

```typescript
// Email validation
export const emailSchema = z.string().email().max(255)

// Order validation
export const createOrderSchema = z.object({
  items: z.array(z.object({
    type: z.enum(['ebook', 'combo']),
    id: z.string().uuid(),
    quantity: z.number().int().min(1).max(10),
  })).min(1).max(20),
})
```

### Sanitization Functions

```typescript
// Remove XSS vectors
sanitizeHtml(html)      // Remove <script>, onclick, javascript:
sanitizeString(input)   // Remove <>, trim, limit length
isValidUuid(uuid)       // Validate UUID format
isValidSlug(slug)       // Validate URL slug format
```

**Áp dụng cho:**
- ✅ User input từ forms
- ✅ URL parameters
- ✅ API request body
- ✅ Database queries (prevent SQL injection)

---

## 🔐 6. WEBHOOK SECURITY

### Sepay Webhook Verification

File: `app/api/sepay/webhook/route.ts`

```typescript
function verifyApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const apiKeyMatch = authHeader.match(/^Apikey\s+(.+)$/i)
  const providedApiKey = apiKeyMatch[1]
  const expectedApiKey = config.sepay.webhookSecret
  
  return providedApiKey === expectedApiKey
}
```

**Bảo mật:**
- ✅ Verify API key trước khi process
- ✅ Verify amount matches order
- ✅ Check order status (chỉ process pending orders)
- ✅ Log tất cả webhook calls

---

## 📊 7. DATABASE SECURITY

### Supabase Security Best Practices

**1. Row Level Security (RLS)**
```sql
-- Enable RLS
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;

-- Policy: Public read
CREATE POLICY "Public read access" ON ebooks
  FOR SELECT USING (active = true);

-- Policy: Admin write
CREATE POLICY "Admin write access" ON ebooks
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

**2. Service Role Key Usage**
- Chỉ dùng trên server-side
- Không expose ra client
- Bypass RLS - cẩn thận khi dùng

**3. Database Backups**
- Supabase tự động backup hàng ngày
- Point-in-time recovery available
- Test restore process định kỳ

---

## 🚨 8. INCIDENT RESPONSE

### Khi Phát Hiện Security Breach

**Bước 1: Immediate Actions**
1. ⚠️ Rotate tất cả API keys ngay lập tức
2. 🔒 Disable compromised accounts
3. 📊 Check logs để xác định phạm vi
4. 💾 Backup database hiện tại

**Bước 2: Investigation**
1. Xác định vector attack
2. Check database cho unauthorized changes
3. Review access logs
4. Identify affected users

**Bước 3: Recovery**
1. Patch security vulnerability
2. Restore data nếu cần
3. Notify affected users
4. Update security documentation

**Bước 4: Prevention**
1. Implement additional security measures
2. Update monitoring/alerting
3. Train team on new procedures
4. Document lessons learned

---

## 📝 9. SECURITY CHECKLIST

### Pre-Deployment

- [ ] Tất cả secrets trong environment variables
- [ ] Không có hardcoded credentials trong code
- [ ] `.env` files trong `.gitignore`
- [ ] RLS policies enabled trên production database
- [ ] Rate limiting configured
- [ ] Security headers implemented
- [ ] Input validation on all API routes
- [ ] HTTPS enforced (Vercel auto)
- [ ] CSP headers configured

### Regular Maintenance

- [ ] Review access logs monthly
- [ ] Rotate API keys quarterly
- [ ] Update dependencies (security patches)
- [ ] Test backup/restore process
- [ ] Review RLS policies
- [ ] Audit admin accounts
- [ ] Check for exposed secrets (GitHub scanning)

---

## 🔗 10. GITHUB PUBLIC REPO - AN TOÀN HAY KHÔNG?

### ✅ AN TOÀN NẾU:

1. **Không có secrets trong code**
   - Tất cả secrets trong environment variables
   - `.env` files được gitignore
   - Không hardcode trong .md files

2. **RLS policies được enable**
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` có thể public
   - Database được bảo vệ bởi RLS

3. **Business logic không chứa vulnerabilities**
   - Input validation đầy đủ
   - No SQL injection vectors
   - No authentication bypass

### ⚠️ RỦI RO:

1. **Hacker có thể:**
   - Đọc toàn bộ source code
   - Tìm logic bugs
   - Clone và chạy local (nhưng không có data)
   - Phân tích business logic

2. **Hacker KHÔNG THỂ:**
   - Truy cập production database (cần SERVICE_ROLE_KEY)
   - Tạo orders giả (cần SEPAY_API_KEY)
   - Đọc/ghi data (RLS protected)
   - Download ebooks (cần valid tokens)

### 💡 KẾT LUẬN:

**Public repo là OK nếu:**
- ✅ Secrets management đúng cách
- ✅ RLS policies chặt chẽ
- ✅ Input validation đầy đủ
- ✅ No hardcoded credentials

**Nhiều công ty lớn dùng public repos:**
- Next.js, Vercel, Supabase đều open source
- Security through obscurity KHÔNG phải best practice
- Good security = proper architecture, không phải hide code

---

## 📞 LIÊN HỆ

**Security Issues:**
- Email: security@ebookmind.com
- Báo cáo vulnerabilities qua email (không public)

**Last Updated:** 2024-03-31
**Version:** 1.0
