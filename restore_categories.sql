-- Step 1: Kiểm tra categories hiện tại
SELECT id, name, slug FROM categories ORDER BY id;

-- Step 2: Nếu categories đã tồn tại, chỉ cần UPDATE tên
UPDATE categories SET name = 'Solo Business' WHERE slug = 'tu-duy-solo-business';
UPDATE categories SET name = 'Phát triển mindset' WHERE slug = 'phat-trien-ban-than';

-- Step 3: Kiểm tra lại sau khi update
SELECT id, name, slug FROM categories ORDER BY id;

-- Step 4: Kiểm tra ebooks có category_id không
SELECT COUNT(*) as ebooks_with_category FROM ebooks WHERE category_id IS NOT NULL;
SELECT COUNT(*) as total_ebooks FROM ebooks;
