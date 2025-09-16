import express from 'express';
import { verifyWebhookSignature } from '../config/razorpay.js';
import { db } from '../config/supabase.js';

const router = express.Router();

// Middleware to capture raw body for signature verification
router.use('/razorpay', express.raw({ type: 'application/json' }));

// Razorpay webhook endpoint
router.post('/razorpay', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body;

    console.log('Webhook received:', {
      signature: signature ? 'present' : 'missing',
      bodyLength: body.length,
      timestamp: new Date().toISOString()
    });

    // Verify webhook signature
    if (!signature || !verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ 
        error: 'Invalid signature',
        timestamp: new Date().toISOString()
      });
    }

    // Parse webhook payload
    const event = JSON.parse(body.toString());
    console.log('Webhook event:', event.event);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event);
        break;
      
      case 'order.paid':
        await handleOrderPaid(event);
        break;
      
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    res.status(200).json({ 
      success: true,
      event: event.event,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Handle successful payment
async function handlePaymentCaptured(event) {
  try {
    const paymentData = event.payload.payment.entity;
    const orderId = paymentData.order_id;
    const paymentId = paymentData.id;

    console.log('Processing payment captured:', {
      orderId,
      paymentId,
      amount: paymentData.amount,
      currency: paymentData.currency
    });

    // Update payment status in database
    const updatedPayment = await db.updatePaymentStatus(
      orderId, 
      'completed', 
      paymentId
    );

    console.log('Payment status updated:', {
      orderId,
      status: 'completed',
      paymentId
    });

    // You can add additional logic here like:
    // - Send confirmation email
    // - Update user access
    // - Trigger other business logic

  } catch (error) {
    console.error('Error handling payment captured:', error);
    throw error;
  }
}

// Handle failed payment
async function handlePaymentFailed(event) {
  try {
    const paymentData = event.payload.payment.entity;
    const orderId = paymentData.order_id;
    const paymentId = paymentData.id;

    console.log('Processing payment failed:', {
      orderId,
      paymentId,
      error: paymentData.error
    });

    // Update payment status in database
    const updatedPayment = await db.updatePaymentStatus(
      orderId, 
      'failed', 
      paymentId
    );

    console.log('Payment status updated:', {
      orderId,
      status: 'failed',
      paymentId
    });

    // You can add additional logic here like:
    // - Send failure notification
    // - Log failure reason
    // - Trigger retry logic

  } catch (error) {
    console.error('Error handling payment failed:', error);
    throw error;
  }
}

// Handle order paid (alternative to payment.captured)
async function handleOrderPaid(event) {
  try {
    const orderData = event.payload.order.entity;
    const orderId = orderData.id;

    console.log('Processing order paid:', {
      orderId,
      amount: orderData.amount,
      currency: orderData.currency
    });

    // Update payment status in database
    const updatedPayment = await db.updatePaymentStatus(orderId, 'completed');

    console.log('Order status updated:', {
      orderId,
      status: 'completed'
    });

  } catch (error) {
    console.error('Error handling order paid:', error);
    throw error;
  }
}

// Webhook test endpoint (for development)
router.post('/test', (req, res) => {
  console.log('Test webhook received:', req.body);
  res.status(200).json({ 
    message: 'Test webhook received successfully',
    timestamp: new Date().toISOString(),
    body: req.body
  });
});

// Webhook status endpoint
router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      razorpay: '/api/webhook/razorpay',
      test: '/api/webhook/test'
    }
  });
});

export default router;
