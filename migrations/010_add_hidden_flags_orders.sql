-- Add hidden flags for admin soft-delete (hide from lists)

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS is_hidden boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS hidden_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_orders_is_hidden_created_at
ON public.orders (is_hidden, created_at DESC);
