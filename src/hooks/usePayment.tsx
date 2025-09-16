import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PaymentStatus {
  hasActivePayment: boolean;
  loading: boolean;
  error: string | null;
}

export const usePayment = () => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    hasActivePayment: false,
    loading: true,
    error: null
  });

  const checkPaymentStatus = async () => {
    if (!user) {
      setPaymentStatus({
        hasActivePayment: false,
        loading: false,
        error: null
      });
      return;
    }

    try {
      setPaymentStatus(prev => ({ ...prev, loading: true, error: null }));

      // Check if user has any completed payment in the last 24 hours
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      setPaymentStatus({
        hasActivePayment: payments && payments.length > 0,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus({
        hasActivePayment: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to check payment status'
      });
    }
  };

  const createPaymentOrder = async (amount: number = 9900) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/functions/v1/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  };

  const refreshPaymentStatus = () => {
    checkPaymentStatus();
  };

  useEffect(() => {
    checkPaymentStatus();
  }, [user]);

  return {
    ...paymentStatus,
    checkPaymentStatus,
    createPaymentOrder,
    refreshPaymentStatus,
  };
};
