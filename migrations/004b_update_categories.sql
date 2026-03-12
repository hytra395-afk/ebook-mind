-- Step 2: Update categories
-- Run this AFTER running 004a_drop_not_null_constraint.sql

-- Update any existing ebooks to set category_id to NULL
UPDATE ebooks SET category_id = NULL;

-- Delete all existing categories
DELETE FROM categories;

-- Insert new categories
INSERT INTO categories (name, slug, description) VALUES
  ('Tư duy solo business', 'tu-duy-solo-business', 'Xây dựng và phát triển business một mình'),
  ('Kinh doanh ngách', 'kinh-doanh-ngach', 'Tìm và khai thác thị trường ngách hiệu quả'),
  ('Phát triển bản thân', 'phat-trien-ban-than', 'Nâng cao kỹ năng và tư duy cá nhân'),
  ('Công nghệ', 'cong-nghe', 'Kiến thức về công nghệ và lập trình'),
  ('Sức khỏe', 'suc-khoe', 'Chăm sóc sức khỏe thể chất và tinh thần');

-- Verify categories were inserted
SELECT id, name, slug FROM categories ORDER BY name;
