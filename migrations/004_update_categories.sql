-- Update categories to match new structure
-- Delete old categories and create new ones

-- Step 1: Disable foreign key constraints temporarily
SET session_replication_role = replica;

-- Step 2: Update any existing ebooks to set category_id to NULL
UPDATE ebooks SET category_id = NULL;

-- Step 3: Delete all existing categories
DELETE FROM categories;

-- Step 4: Re-enable foreign key constraints
SET session_replication_role = default;

-- Step 5: Remove NOT NULL constraint from category_id
ALTER TABLE ebooks ALTER COLUMN category_id DROP NOT NULL;

-- Step 6: Insert new categories
INSERT INTO categories (name, slug, description) VALUES
  ('Tư duy solo business', 'tu-duy-solo-business', 'Xây dựng và phát triển business một mình'),
  ('Kinh doanh ngách', 'kinh-doanh-ngach', 'Tìm và khai thác thị trường ngách hiệu quả'),
  ('Phát triển bản thân', 'phat-trien-ban-than', 'Nâng cao kỹ năng và tư duy cá nhân'),
  ('Công nghệ', 'cong-nghe', 'Kiến thức về công nghệ và lập trình'),
  ('Sức khỏe', 'suc-khoe', 'Chăm sóc sức khỏe thể chất và tinh thần');
