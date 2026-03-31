# HƯỚNG DẪN UPDATE NỘI DUNG BLOG

## 📋 Tổng Quan

Đã tạo nội dung đầy đủ cho **20 bài blog** với:
- Mỗi bài 800-1200 từ
- Cấu trúc HTML đầy đủ (H2, H3, ul, ol, blockquote, p)
- Nội dung SEO-optimized
- Keyword density phù hợp

## 🚀 CÁCH CHẠY SQL

### Bước 1: Mở Supabase SQL Editor

Truy cập: Supabase Dashboard → SQL Editor

### Bước 2: Chạy PART 1 (Bài 1-10)

1. Mở file `BLOG_CONTENT_PART1.sql`
2. Copy toàn bộ nội dung
3. Paste vào Supabase SQL Editor
4. Click **RUN** hoặc nhấn `Ctrl/Cmd + Enter`
5. Đợi kết quả: "Updated 10/20 blog posts"

### Bước 3: Chạy PART 2 (Bài 11-20)

1. Mở file `BLOG_CONTENT_PART2.sql`
2. Copy toàn bộ nội dung
3. Paste vào Supabase SQL Editor
4. Click **RUN**
5. Đợi kết quả: "Updated all 20 blog posts successfully!"

## ✅ VERIFY KẾT QUẢ

### Kiểm tra trên Supabase

```sql
-- Xem tất cả bài blog có nội dung
SELECT 
  slug, 
  title,
  LENGTH(content) as content_length,
  SUBSTRING(content, 1, 100) as preview
FROM blog_posts 
ORDER BY published_at DESC;
```

Kết quả mong đợi:
- `content_length` > 2000 ký tự cho mỗi bài
- `preview` hiển thị HTML tags (h2, p, ul...)

### Kiểm tra trên Website

1. Truy cập: https://ebookmind.com/blog
2. Click vào bất kỳ bài blog nào
3. Xác nhận:
   - ✅ Nội dung hiển thị đầy đủ
   - ✅ Formatting đúng (headings, lists, quotes)
   - ✅ Không còn nội dung ngắn/trống

## 📝 DANH SÁCH 20 BÀI BLOG

### Kinh Doanh Vốn Nhỏ (8 bài)
1. `kinh-doanh-von-nho-2026-top-15-y-tuong`
2. `kinh-doanh-it-von-duoi-5-trieu-huong-dan-tu-a-z`
3. `it-von-nen-kinh-doanh-gi-2026-10-ngach-thinh-hanh`
4. `kinh-doanh-online-khong-can-von-5-mo-hinh-zero-risk-2026`
5. `kinh-doanh-nho-tai-nha-2026-20-y-tuong-lai-deu-hang-thang`
6. `tu-5-trieu-den-100-trieu-lo-trinh-kinh-doanh-chi-tiet-2026`
7. `quan-ly-von-hieu-qua-7-ky-nang-can-co-khi-kinh-doanh-it-von`
8. `case-study-5-nguoi-thanh-cong-voi-von-duoi-10-trieu`

### Solo Business (4 bài)
9. `solo-business-la-gi-huong-dan-xay-dung-doanh-nghiep-mot-nguoi-2026`
10. `10-cong-cu-bat-bai-cho-solo-business-toi-uu-2026`
11. `tu-dong-hoa-solo-business-lam-it-hon-kiem-nhieu-hon-2026`
12. `tu-0-den-20-trieu-thang-voi-solo-business-lo-trinh-thuc-chien`

### Kinh Doanh Ngách (4 bài)
13. `kinh-doanh-ngach-la-gi-tim-hieu-tu-a-z-2026`
14. `7-buoc-tim-ngach-kinh-doanh-lai-cao-it-canh-tranh`
15. `top-10-ngach-kinh-doanh-bung-no-2026-ma-chua-ai-nhan-ra`
16. `kinh-doanh-ngach-online-chien-luoc-bung-no-tren-mang-xa-hoi`

### Mindset & Tư Duy (2 bài)
17. `7-mindset-kinh-doanh-can-co-de-thanh-cong-2026`
18. `vuot-qua-noi-so-that-bai-khi-kinh-doanh-von-nho`

### Ebook & Học Tập (2 bài)
19. `top-10-ebook-kinh-doanh-hay-nhat-2026-ban-phai-doc`
20. `xay-dung-thoi-quen-cua-doanh-nhan-thanh-cong-tu-von-nho`

## 🔧 TROUBLESHOOTING

### Lỗi: "syntax error"
- Kiểm tra copy đầy đủ nội dung file
- Đảm bảo không bị cắt nửa chừng

### Lỗi: "no rows updated"
- Kiểm tra slug có đúng không
- Chạy lại SETUP_BLOG.sql để tạo dữ liệu ban đầu

### Nội dung vẫn trống
- Clear cache trình duyệt
- Hard refresh (Ctrl/Cmd + Shift + R)
- Kiểm tra lại database bằng SQL query

## 📊 KẾT QUẢ MONG ĐỢI

Sau khi chạy xong 2 file SQL:

✅ **20/20 bài blog** có nội dung đầy đủ  
✅ **Mỗi bài 800-1200 từ** với cấu trúc rõ ràng  
✅ **SEO-optimized** với keywords phù hợp  
✅ **Ready for production** tại https://ebookmind.com/blog

---

**Thời gian thực hiện:** 5-10 phút  
**Độ khó:** Dễ (Copy & Paste)  
**Status:** ✅ READY TO RUN
