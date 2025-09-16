import express from 'express';
import { razorpayHelpers } from '../config/razorpay.js';
import { db } from '../config/supabase.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount = 9900, userId } = req.body; // Default ₹99

    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    console.log('Creating payment order:', {
      amount,
      userId,
      timestamp: new Date().toISOString()
    });

    // Create payment record in database
    const paymentRecord = await db.createPayment({
      user_id: userId,
      amount: amount,
      currency: 'INR',
      status: 'pending'
    });

    console.log('Payment record created:', paymentRecord.id);

    // Create Razorpay order
    const order = await razorpayHelpers.createOrder(
      amount,
      paymentRecord.id,
      {
        user_id: userId,
        payment_id: paymentRecord.id
      }
    );

    console.log('Razorpay order created:', order.id);

    // Update payment record with Razorpay order ID
    await db.updatePaymentStatus(order.id, 'pending');

    // Return order details for frontend
    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      payment_id: paymentRecord.id
    });

  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ 
      error: 'Failed to create payment order',
      details: error.message
    });
  }
});

// Check payment status
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    console.log('Checking payment status:', orderId);

    // Get payment from database
    const payment = await db.getPaymentByOrderId(orderId);

    if (!payment) {
      return res.status(404).json({ 
        error: 'Payment not found' 
      });
    }

    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        order_id: payment.razorpay_order_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        created_at: payment.created_at,
        updated_at: payment.updated_at
      }
    });

  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ 
      error: 'Failed to check payment status',
      details: error.message
    });
  }
});

// Check user's active payment
router.get('/user/:userId/active', async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('Checking user active payment:', userId);

    // Get user's active payment
    const activePayment = await db.getUserActivePayment(userId);

    res.status(200).json({
      success: true,
      hasActivePayment: !!activePayment,
      payment: activePayment ? {
        id: activePayment.id,
        amount: activePayment.amount,
        currency: activePayment.currency,
        status: activePayment.status,
        created_at: activePayment.created_at,
        expires_at: new Date(activePayment.created_at.getTime() + 24 * 60 * 60 * 1000)
      } : null
    });

  } catch (error) {
    console.error('Error checking user active payment:', error);
    res.status(500).json({ 
      error: 'Failed to check user active payment',
      details: error.message
    });
  }
});

// Verify payment (for manual verification if needed)
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ 
        error: 'Order ID, Payment ID, and Signature are required' 
      });
    }

    console.log('Verifying payment:', { orderId, paymentId });

    // Verify payment with Razorpay
    const isValid = await razorpayHelpers.verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({ 
        error: 'Invalid payment signature' 
      });
    }

    // Update payment status in database
    const updatedPayment = await db.updatePaymentStatus(orderId, 'completed', paymentId);

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment: updatedPayment
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Failed to verify payment',
      details: error.message
    });
  }
});

// Get payment history for user
router.get('/user/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    console.log('Getting payment history for user:', userId);

    // Get user's payment history from database
    const { data: payments, error } = await db.supabaseAdmin
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) throw error;

    res.status(200).json({
      success: true,
      payments: payments || [],
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: payments?.length || 0
      }
    });

  } catch (error) {
    console.error('Error getting payment history:', error);
    res.status(500).json({ 
      error: 'Failed to get payment history',
      details: error.message
    });
  }
});

export default router;
