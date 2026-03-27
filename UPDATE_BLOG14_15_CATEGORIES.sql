-- Update Blog Post 14 & 15 Categories to match existing categories
-- Current categories: Kinh Doanh Vốn Nhỏ, Solo Business, Kinh Doanh Ngách, Mindset & Tư Duy, Kỹ Năng, Ebook & Học Tập

-- Update Blog Post 14: Personal Brand -> Solo Business
UPDATE public.blog_posts 
SET category = 'Solo Business',
    updated_at = NOW()
WHERE slug = 'personal-brand-la-gi-va-tai-sao-day-la-tai-san-quan-trong-nhat-ban-co-the-xay-dung-khi-kinh-doanh-mot-minh';

-- Update Blog Post 15: Bán hàng online -> Kinh Doanh Ngách  
UPDATE public.blog_posts 
SET category = 'Kinh Doanh Ngách',
    updated_at = NOW()
WHERE slug = 'ban-hang-online-khong-kho-kho-la-ban-dang-co-ban-cho-tat-ca-moi-nguoi-thay-vi-dung-nguoi';

-- Verify updates
SELECT title, slug, category, updated_at 
FROM public.blog_posts 
WHERE slug IN (
  'personal-brand-la-gi-va-tai-sao-day-la-tai-san-quan-trong-nhat-ban-co-the-xay-dung-khi-kinh-doanh-mot-minh',
  'ban-hang-online-khong-kho-kho-la-ban-dang-co-ban-cho-tat-ca-moi-nguoi-thay-vi-dung-nguoi'
);
