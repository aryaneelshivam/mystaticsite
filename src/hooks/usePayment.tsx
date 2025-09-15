import { useState, useEffect } from 'react';
import { PaymentService } from '@/services/paymentService';
import { useAuth } from '@/hooks/useAuth';

export function usePayment() {
  const { user } = useAuth();
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!user) {
        setHasPaid(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [paidStatus, userPayments] = await Promise.all([
          PaymentService.hasUserPaid(user.id),
          PaymentService.getUserPayments(user.id)
        ]);
        
        setHasPaid(paidStatus);
        setPayments(userPayments);
      } catch (error) {
        console.error('Error checking payment status:', error);
        setHasPaid(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [user]);

  const initiatePayment = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    return await PaymentService.initiatePayment(user.id);
  };

  const refreshPaymentStatus = async () => {
    if (!user) return;
    
    try {
      const [paidStatus, userPayments] = await Promise.all([
        PaymentService.hasUserPaid(user.id),
        PaymentService.getUserPayments(user.id)
      ]);
      
      setHasPaid(paidStatus);
      setPayments(userPayments);
    } catch (error) {
      console.error('Error refreshing payment status:', error);
    }
  };

  return {
    hasPaid,
    isLoading,
    payments,
    initiatePayment,
    refreshPaymentStatus
  };
}
