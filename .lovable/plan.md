

# Plan: Implement All 5 Features

This plan covers: (1) Real-time order status notifications, (2) Promo code/coupon system, (3) Post-delivery order ratings, (4) Automatic inventory deduction, (5) Admin analytics dashboard.

---

## 1. Database Changes (Single Migration)

Create the following new tables and functions:

- **`promo_codes`** table: `id`, `code` (unique), `discount_type` (percentage/fixed), `discount_value`, `min_order_amount`, `max_uses`, `used_count`, `is_active`, `expires_at`, `created_at`
- **`order_ratings`** table: `id`, `order_id` (unique ref), `user_id`, `food_rating` (1-5), `delivery_rating` (1-5), `comment`, `created_at`
- **Database function** `deduct_inventory`: Called via trigger or in the CartSheet after order creation to reduce `stock_quantity` on grocery_items, shop_items, spirits_items based on ordered items, and auto-set `is_available = false` when stock reaches 0.
- Enable realtime on `order_ratings` table.
- RLS policies:
  - `promo_codes`: Admins can ALL, anyone can SELECT active codes
  - `order_ratings`: Users can INSERT/SELECT own, admins can SELECT all

## 2. Real-Time Order Status Notifications (Enhancement)

**Already mostly implemented** in `usePushNotifications.ts`. Enhancement needed:
- Ensure the hook is used globally in `App.tsx` or `Index.tsx` so notifications fire on every page, not just when the component is mounted.
- Add a small `NotificationListener` component that mounts the hook at the app level.

## 3. Promo Code / Coupon System

**Files to create/edit:**
- **`src/hooks/usePromoCodes.ts`**: Hook to validate promo codes and fetch admin list.
- **`src/components/PromoCodeInput.tsx`**: Input component for checkout (in CartSheet) where users type a code, it validates against the DB, and applies discount to the total.
- **`src/components/CartSheet.tsx`**: Add PromoCodeInput between location picker and payment. Adjust `totalWithFee` to account for discount. Store discount in order notes.
- **`src/pages/Admin.tsx`**: Add a "Promos" tab for CRUD on promo codes (create, toggle active, delete).

## 4. Post-Delivery Order Ratings

**Files to create/edit:**
- **`src/components/OrderRatingDialog.tsx`**: Dialog with star ratings for food quality + delivery experience + optional comment. Shown when an order status changes to "delivered".
- **`src/pages/Profile.tsx`**: In the Orders tab, add a "Rate Order" button for delivered orders that haven't been rated yet.
- **`src/pages/Admin.tsx`**: Show average ratings per order in the Orders tab. Add a "Ratings" summary in the analytics section.

## 5. Automatic Inventory Deduction

**Approach:** Server-side via the `paystack-webhook` edge function (most reliable) + client-side fallback in `CartSheet.tsx`.

- **`supabase/functions/paystack-webhook/index.ts`**: After confirming payment, query `order_items` for the order, then for each item, decrement `stock_quantity` on the matching table (using `item_name` to find it across `grocery_items`, `shop_items`, `spirits_items`, `menu_items`). Set `is_available = false` when stock hits 0.
- **`src/components/CartSheet.tsx`**: As a fallback, after successful order creation, attempt to deduct stock client-side (non-blocking, best-effort).

## 6. Admin Analytics Dashboard

**Files to create:**
- **`src/components/admin/AnalyticsSection.tsx`**: New component with:
  - Sales trend chart (daily/weekly/monthly) using `recharts` (already installed)
  - Top-selling items (aggregate from `order_items`)
  - Peak order hours (histogram from `orders.created_at`)
  - Average order value
  - Revenue vs expenses over time
- **`src/pages/Admin.tsx`**: Add an "Analytics" tab with `BarChart` icon, rendering `AnalyticsSection`.

## Summary of Files

| Action | File |
|--------|------|
| Migration | New tables: `promo_codes`, `order_ratings` + RLS policies |
| Create | `src/hooks/usePromoCodes.ts` |
| Create | `src/components/PromoCodeInput.tsx` |
| Create | `src/components/OrderRatingDialog.tsx` |
| Create | `src/components/NotificationListener.tsx` |
| Create | `src/components/admin/AnalyticsSection.tsx` |
| Edit | `src/components/CartSheet.tsx` — add promo code + inventory deduction |
| Edit | `src/pages/Admin.tsx` — add Promos tab, Analytics tab, ratings display |
| Edit | `src/pages/Profile.tsx` — add rate order button for delivered orders |
| Edit | `src/App.tsx` — mount NotificationListener globally |
| Edit | `supabase/functions/paystack-webhook/index.ts` — add inventory deduction |

