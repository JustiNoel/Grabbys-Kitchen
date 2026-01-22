-- Add 'rider' to the existing app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'rider';

-- Create a riders table for additional rider-specific information
CREATE TABLE IF NOT EXISTS public.riders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    phone text NOT NULL,
    vehicle_type text DEFAULT 'motorcycle',
    is_available boolean DEFAULT true,
    current_latitude numeric,
    current_longitude numeric,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for riders table
CREATE POLICY "Admins can manage riders" ON public.riders
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Riders can view their own profile" ON public.riders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Riders can update their own profile" ON public.riders
    FOR UPDATE USING (auth.uid() = user_id);

-- Add rider_id to orders table for assignment
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS rider_id uuid REFERENCES public.riders(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS assigned_at timestamptz;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS picked_up_at timestamptz;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at timestamptz;

-- Create trigger for updated_at on riders
CREATE TRIGGER update_riders_updated_at
    BEFORE UPDATE ON public.riders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add policy for riders to view their assigned orders
CREATE POLICY "Riders can view assigned orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.riders 
            WHERE riders.user_id = auth.uid() 
            AND riders.id = orders.rider_id
        )
    );

-- Add policy for riders to update assigned orders (status only)
CREATE POLICY "Riders can update assigned orders" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.riders 
            WHERE riders.user_id = auth.uid() 
            AND riders.id = orders.rider_id
        )
    );