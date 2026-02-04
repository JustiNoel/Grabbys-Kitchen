-- Drop the old constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add new constraint with all needed status values including 'delivering' and 'delivered'
ALTER TABLE orders ADD CONSTRAINT orders_status_check 
CHECK (status = ANY (ARRAY['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'completed', 'cancelled']));