-- Update categories to match new structure
-- Delete old categories and create new ones

-- First, update any existing ebooks to avoid foreign key issues
UPDATE ebooks SET category_id = NULL WHERE category_id IS NOT NULL;

-- Delete all existing categories
DELETE FROM categories;

-- Insert new categories with specific order
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Tư duy solo business', 'tu-duy-solo-business', 'Xây dựng và phát triển business một mình', 1),
  ('Kinh doanh ngách', 'kinh-doanh-ngach', 'Tìm và khai thác thị trường ngách hiệu quả', 2),
  ('Phát triển bản thân', 'phat-trien-ban-than', 'Nâng cao kỹ năng và tư duy cá nhân', 3),
  ('Công nghệ', 'cong-nghe', 'Kiến thức về công nghệ và lập trình', 4),
  ('Sức khỏe', 'suc-khoe', 'Chăm sóc sức khỏe thể chất và tinh thần', 5);
