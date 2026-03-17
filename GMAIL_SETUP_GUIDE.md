# 📧 Hướng Dẫn Setup Gmail SMTP cho Email Fallback

Email system hiện tại sử dụng **Brevo** làm provider chính và **Gmail SMTP (Nodemailer)** làm fallback.

Nếu Brevo fail, hệ thống tự động chuyển sang Gmail SMTP để đảm bảo email luôn được gửi.

---

## 🔧 Setup Gmail App Password

### **Bước 1: Enable 2-Step Verification**

1. Vào: https://myaccount.google.com/security
2. Tìm **"2-Step Verification"**
3. Click **"Get started"** và làm theo hướng dẫn
4. Verify bằng phone number

### **Bước 2: Tạo App Password**

1. Vào: https://myaccount.google.com/apppasswords
2. Chọn app: **"Mail"**
3. Chọn device: **"Other (Custom name)"**
4. Nhập tên: **"Ebook Mind - Production"**
5. Click **"Generate"**
6. Copy 16-character password (format: `xxxx xxxx xxxx xxxx`)

### **Bước 3: Add vào Vercel Environment Variables**

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project: **ebook-mind**
3. Settings → Environment Variables
4. Add 2 variables:

```
GMAIL_USER=ebookmind0@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

5. Click **"Save"**
6. Redeploy project

---

## ✅ Verify Setup

Sau khi deploy, check logs:

```
✅ [NODEMAILER] Gmail credentials found: ebookmind0@gmail.com
✅ [NODEMAILER] Email sent successfully
```

---

## 🔄 Email Flow

### **Normal Flow (Brevo hoạt động):**
1. Webhook → `sendOrderConfirmationEmail()`
2. Try Brevo API (3 attempts với retry)
3. ✅ Email sent via Brevo
4. Done

### **Fallback Flow (Brevo fail):**
1. Webhook → `sendOrderConfirmationEmail()`
2. Try Brevo API (3 attempts)
3. ❌ All Brevo attempts failed
4. 🔄 Fallback to Nodemailer
5. ✅ Email sent via Gmail SMTP
6. Done

### **Worst Case (Both fail):**
1. Both providers fail
2. ❌ Email NOT sent
3. User can click "Gửi lại email" button
4. Retry with same fallback logic

---

## 📊 Monitoring

Check Vercel logs để xem email provider nào được dùng:

```bash
# Brevo success
✅ [EMAIL] Email sent successfully via Brevo to: user@example.com

# Brevo fail → Nodemailer success
❌ [EMAIL] All Brevo retry attempts failed
🔄 [EMAIL] Trying fallback: Nodemailer + Gmail SMTP...
✅ [EMAIL] Email sent successfully via Nodemailer fallback!

# Both fail
❌ [EMAIL] All email providers failed. Email NOT sent.
```

---

## ⚠️ Gmail Limits

- **Daily limit:** ~500 emails/day
- **Rate limit:** ~100 emails/hour
- **Spam protection:** Gmail có thể block nếu gửi quá nhiều

**Recommendation:** Dùng Brevo làm primary, Gmail chỉ là fallback emergency.

---

## 🔐 Security

- ✅ App Password an toàn hơn real password
- ✅ Có thể revoke bất cứ lúc nào
- ✅ Chỉ dùng cho SMTP, không có quyền khác
- ✅ Store trong Vercel env vars (encrypted)

---

## 🐛 Troubleshooting

### **Error: "Invalid login"**
- Check GMAIL_USER đúng email
- Check GMAIL_APP_PASSWORD đúng format (16 chars)
- Verify 2-Step Verification đã enable

### **Error: "Daily limit exceeded"**
- Gmail đã gửi quá 500 emails/day
- Chờ 24h hoặc dùng email khác

### **Email vào spam**
- Normal cho lần đầu
- User cần mark "Not spam"
- Sau vài lần sẽ vào inbox

---

**Setup xong là email sẽ luôn được gửi, dù Brevo có fail!** 🎯
