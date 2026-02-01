import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface PushNotificationState {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission | null;
}

export const usePushNotifications = () => {
  const { user } = useAuth();
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isSubscribed: false,
    permission: null,
  });

  useEffect(() => {
    // Check if push notifications are supported
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    setState(prev => ({
      ...prev,
      isSupported,
      permission: isSupported ? Notification.permission : null,
    }));
  }, []);

  const requestPermission = useCallback(async () => {
    if (!state.isSupported) {
      toast.error('Push notifications are not supported in this browser');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));

      if (permission === 'granted') {
        toast.success('Push notifications enabled! 🔔');
        return true;
      } else if (permission === 'denied') {
        toast.error('Push notifications were denied');
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to request notification permission');
      return false;
    }
  }, [state.isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (state.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    try {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        ...options,
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [state.permission]);

  // Subscribe to order status changes for the current user
  useEffect(() => {
    if (!user || state.permission !== 'granted') return;

    const channel = supabase
      .channel('order-status-notifications')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          const orderId = payload.new.id?.slice(-6).toUpperCase();

          const statusMessages: Record<string, { title: string; body: string; icon: string }> = {
            confirmed: {
              title: '✅ Order Confirmed!',
              body: `Your order #${orderId} has been confirmed and is being prepared.`,
              icon: '✅',
            },
            preparing: {
              title: '👨‍🍳 Preparing Your Order',
              body: `Your order #${orderId} is now being prepared with care.`,
              icon: '👨‍🍳',
            },
            ready: {
              title: '🎉 Order Ready!',
              body: `Your order #${orderId} is ready for pickup/delivery.`,
              icon: '🎉',
            },
            delivering: {
              title: '🚴 On The Way!',
              body: `Your order #${orderId} is on its way to you. Track your rider!`,
              icon: '🚴',
            },
            delivered: {
              title: '📦 Order Delivered!',
              body: `Your order #${orderId} has been delivered. Enjoy! 🎉`,
              icon: '📦',
            },
          };

          const message = statusMessages[newStatus];
          if (message) {
            showNotification(message.title, {
              body: message.body,
              tag: `order-${orderId}`,
            });

            // Also show toast for in-app notification
            toast.success(message.title, {
              description: message.body,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, state.permission, showNotification]);

  return {
    ...state,
    requestPermission,
    showNotification,
  };
};

export default usePushNotifications;
