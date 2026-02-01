import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAuth } from '@/context/AuthContext';

const PushNotificationPrompt = () => {
  const { user } = useAuth();
  const { isSupported, permission, requestPermission } = usePushNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Only show prompt if:
    // 1. User is logged in
    // 2. Push notifications are supported
    // 3. Permission hasn't been granted or denied yet
    // 4. User hasn't dismissed the prompt
    const dismissed = localStorage.getItem('push_notification_dismissed');
    
    if (user && isSupported && permission === 'default' && !dismissed) {
      // Show after a delay to not overwhelm users
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user, isSupported, permission]);

  const handleEnable = async () => {
    await requestPermission();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('push_notification_dismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-24 right-4 z-40 max-w-sm"
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-start gap-4">
            <motion.div
              className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3 
              }}
            >
              <Bell className="h-6 w-6 text-primary" />
            </motion.div>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Enable Notifications 🔔
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get real-time updates when your order status changes!
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleEnable}
                  className="flex-1"
                >
                  Enable
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                >
                  Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PushNotificationPrompt;
