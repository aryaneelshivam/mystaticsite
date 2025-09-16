import Razorpay from 'razorpay';
import crypto from 'crypto';

// Razorpay configuration
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

if (!razorpayKeyId || !razorpayKeySecret || !webhookSecret) {
  throw new Error('Missing Razorpay environment variables');
}

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret
});

// Webhook signature verification
export const verifyWebhookSignature = (body, signature) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

// Razorpay helper functions
export const razorpayHelpers = {
  // Create order
  async createOrder(amount, receipt, notes = {}) {
    try {
      const order = await razorpay.orders.create({
        amount: amount, // Amount in paise
        currency: 'INR',
        receipt: receipt,
        notes: notes
      });
      
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  },

  // Fetch order details
  async getOrder(orderId) {
    try {
      const order = await razorpay.orders.fetch(orderId);
      return order;
    } catch (error) {
      console.error('Error fetching Razorpay order:', error);
      throw error;
    }
  },

  // Fetch payment details
  async getPayment(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('Error fetching Razorpay payment:', error);
      throw error;
    }
  },

  // Verify payment
  async verifyPayment(orderId, paymentId, signature) {
    try {
      const crypto = require('crypto');
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(body)
        .digest('hex');
      
      return signature === expectedSignature;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }
};

export default { razorpay, verifyWebhookSignature, razorpayHelpers };
