-- Update category slugs
UPDATE categories SET slug = 'solo-business' WHERE slug = 'tu-duy-solo-business';
UPDATE categories SET slug = 'phat-trien-mindset' WHERE slug = 'phat-trien-ban-than';

-- Verify slugs were updated
SELECT id, name, slug FROM categories ORDER BY id;
