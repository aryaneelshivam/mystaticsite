import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Payment = Database['public']['Tables']['payments']['Row'];
type PaymentInsert = Database['public']['Tables']['payments']['Insert'];
type PaymentUpdate = Database['public']['Tables']['payments']['Update'];

// RazorPay configuration
const RAZORPAY_KEY_ID = 'rzp_live_RHkUFiZGyLjYhx';
const RAZORPAY_KEY_SECRET = '6RBE9BbkUU3AYxZs111Rd41m';

// Load RazorPay script dynamically
const loadRazorPayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export class PaymentService {
  // Create a new payment record
  static async createPayment(userId: string, amount: number = 9900): Promise<Payment | null> {
    try {
      const paymentData: PaymentInsert = {
        user_id: userId,
        amount,
        currency: 'INR',
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('payments')
        .insert(paymentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating payment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating payment:', error);
      return null;
    }
  }

  // Update payment status
  static async updatePayment(
    paymentId: string, 
    updates: PaymentUpdate
  ): Promise<Payment | null> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId)
        .select()
        .single();

      if (error) {
        console.error('Error updating payment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating payment:', error);
      return null;
    }
  }

  // Check if user has completed payment
  static async hasUserPaid(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('status')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking payment status:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  }

  // Get user's payment history
  static async getUserPayments(userId: string): Promise<Payment[]> {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  }

  // Initialize RazorPay payment
  static async initiatePayment(userId: string, amount: number = 9900): Promise<boolean> {
    try {
      // Load RazorPay script
      const scriptLoaded = await loadRazorPayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load RazorPay script');
      }

      // Create payment record
      const payment = await this.createPayment(userId, amount);
      if (!payment) {
        throw new Error('Failed to create payment record');
      }

      // Create RazorPay order (this would typically be done on your backend)
      // For now, we'll use a mock order ID
      const orderId = `order_${payment.id}_${Date.now()}`;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: 'INR',
        name: 'MyStaticSite',
        description: 'Website Builder Access',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // Update payment with RazorPay details
            await this.updatePayment(payment.id, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              status: 'completed'
            });

            // Show success message
            alert('Payment successful! You now have access to download your website code.');
            
            // Reload the page to update the UI
            window.location.reload();
          } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment successful but there was an error updating your account. Please contact support.');
          }
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: async () => {
            // Update payment status to cancelled
            await this.updatePayment(payment.id, {
              status: 'cancelled'
            });
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      return true;
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
      return false;
    }
  }
}

// Extend Window interface for RazorPay
declare global {
  interface Window {
    Razorpay: any;
  }
}
