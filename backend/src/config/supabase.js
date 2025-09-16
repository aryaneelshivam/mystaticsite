import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase clients
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for admin operations (like webhook updates)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database helper functions
export const db = {
  // Create payment record
  async createPayment(paymentData) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .insert(paymentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update payment status
  async updatePaymentStatus(orderId, status, paymentId = null) {
    const updateData = { status };
    if (paymentId) {
      updateData.razorpay_payment_id = paymentId;
    }

    const { data, error } = await supabaseAdmin
      .from('payments')
      .update(updateData)
      .eq('razorpay_order_id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get payment by order ID
  async getPaymentByOrderId(orderId) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('razorpay_order_id', orderId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Check user's active payment
  async getUserActivePayment(userId) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  }
};

export default { supabase, supabaseAdmin, db };
