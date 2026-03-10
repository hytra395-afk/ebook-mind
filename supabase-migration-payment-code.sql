-- Add payment_code field to orders table
-- This field stores the Sepay payment code format: EBOOK + 3-10 digits
-- Example: EBOOK1234567890

ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_code TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_payment_code ON orders(payment_code);

-- Add comment
COMMENT ON COLUMN orders.payment_code IS 'Sepay payment code format: EBOOK + 3-10 digit number';
