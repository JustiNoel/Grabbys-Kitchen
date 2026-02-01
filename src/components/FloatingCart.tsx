import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartSheet from './CartSheet';

const FloatingCart = () => {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              className="relative flex items-center gap-3 px-5 py-3 bg-primary/90 backdrop-blur-md text-primary-foreground rounded-full shadow-2xl border border-primary-foreground/20 hover:bg-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 10px 40px -10px rgba(196, 94, 46, 0.5)',
                  '0 20px 60px -15px rgba(196, 94, 46, 0.7)',
                  '0 10px 40px -10px rgba(196, 94, 46, 0.5)',
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                <motion.span
                  className="absolute -top-2 -right-2 bg-background text-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                >
                  {totalItems}
                </motion.span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs opacity-80">Your Cart</span>
                <span className="font-bold text-sm">KSh {totalPrice.toLocaleString()}</span>
              </div>
            </motion.button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <CartSheet />
          </SheetContent>
        </Sheet>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCart;
