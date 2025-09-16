# 🔄 Razorpay Webhook Payment System

This document explains how the HTML Creator App handles Razorpay webhook payments for the ₹99 code generation access feature.

## 📋 Overview

The payment system allows users to pay ₹99 to access code generation for 24 hours. The system uses Razorpay for payment processing and webhooks for secure payment verification.

## 🏗️ Architecture

```
User → Frontend → Razorpay → Webhook → Supabase → Database
```

### Components:
1. **Frontend Payment Modal** - User interface for payment
2. **Razorpay Checkout** - Payment processing
3. **Webhook Handler** - Payment verification
4. **Database** - Payment status tracking
5. **Access Control** - 24-hour access management

## 🔧 Technical Implementation

### 1. Frontend Payment Flow

#### Payment Modal (`src/components/PaymentModal.tsx`)
```typescript
// Creates Razorpay order and opens checkout
const handlePayment = async () => {
  const orderData = await createPaymentOrder(); // Calls Supabase function
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

#### Payment Hook (`src/hooks/usePayment.tsx`)
```typescript
// Manages payment status and order creation
const { hasActivePayment, createPaymentOrder } = usePayment();
```

### 2. Backend Functions

#### Create Order Function (`supabase/functions/create-razorpay-order/index.ts`)
```typescript
// Creates payment record and Razorpay order
const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 9900, // ₹99 in paise
    currency: 'INR',
    receipt: payment.id,
    notes: { user_id: user.id, payment_id: payment.id }
  })
});
```

#### Webhook Handler (`supabase/functions/payment-webhook/index.ts`)
```typescript
// Verifies webhook signature and updates payment status
const expectedSignature = await crypto.subtle.sign(
  'HMAC',
  key,
  new TextEncoder().encode(body)
);
```

### 3. Database Schema

#### Payments Table
```sql
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount INTEGER NOT NULL DEFAULT 9900,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔄 Payment Flow Step-by-Step

### Step 1: User Initiates Payment
1. User clicks "Pay ₹99 to Access Code"
2. Frontend calls `createPaymentOrder()`
3. Supabase function creates payment record in database
4. Function creates Razorpay order via API
5. Returns order details to frontend

### Step 2: Razorpay Checkout
1. Frontend opens Razorpay checkout modal
2. User enters payment details
3. Razorpay processes payment
4. On success, Razorpay sends webhook to our endpoint

### Step 3: Webhook Processing
1. Razorpay sends POST request to webhook URL
2. Webhook verifies signature using HMAC-SHA256
3. If valid, processes the payment event
4. Updates payment status in database

### Step 4: Access Grant
1. Frontend refreshes payment status
2. User gains access to code generation
3. Access lasts for 24 hours

## 🔐 Security Features

### 1. Webhook Signature Verification
```typescript
// HMAC-SHA256 signature verification
const key = await crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(webhookSecret),
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign']
);

const expectedSignature = await crypto.subtle.sign(
  'HMAC',
  key,
  new TextEncoder().encode(body)
);
```

### 2. Row Level Security (RLS)
```sql
-- Users can only access their own payments
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = user_id);
```

### 3. Environment Variables
- `RAZORPAY_KEY_ID` - Public key for frontend
- `RAZORPAY_KEY_SECRET` - Private key for backend
- `RAZORPAY_WEBHOOK_SECRET` - Secret for webhook verification

## 📊 Webhook Events

### Payment Captured (`payment.captured`)
```typescript
if (event.event === 'payment.captured') {
  const paymentData = event.payload.payment.entity;
  const orderId = paymentData.order_id;

  // Update payment status to completed
  await supabaseClient
    .from('payments')
    .update({
      status: 'completed',
      razorpay_payment_id: paymentData.id
    })
    .eq('razorpay_order_id', orderId);
}
```

### Payment Failed (`payment.failed`)
```typescript
if (event.event === 'payment.failed') {
  const paymentData = event.payload.payment.entity;
  const orderId = paymentData.order_id;

  // Update payment status to failed
  await supabaseClient
    .from('payments')
    .update({
      status: 'failed',
      razorpay_payment_id: paymentData.id
    })
    .eq('razorpay_order_id', orderId);
}
```

## 🎯 Access Control Logic

### Payment Status Check
```typescript
// Check if user has active payment (last 24 hours)
const { data: payments } = await supabase
  .from('payments')
  .select('*')
  .eq('user_id', user.id)
  .eq('status', 'completed')
  .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
  .order('created_at', { ascending: false })
  .limit(1);

const hasActivePayment = payments && payments.length > 0;
```

### Code Generator Access
```typescript
// Show payment modal if no active payment
if (!hasActivePayment) {
  return <PaymentModal />;
}

// Show code generator if payment is active
return <CodeGenerator />;
```

## 🔧 Configuration

### Environment Variables

#### Frontend (`.env.local`)
```bash
VITE_RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
```

#### Supabase Functions
```bash
RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
RAZORPAY_KEY_SECRET=6RBE9BbkUU3AYxZs111Rd41m
RAZORPAY_WEBHOOK_SECRET=f9cc7f1d8207ac64112f76ddb91e821abd156b878ebf5b8e7715307bf24c0d97
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Razorpay Webhook Configuration
- **URL**: `https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/payment-webhook`
- **Events**: `payment.captured`, `payment.failed`
- **Secret**: `f9cc7f1d8207ac64112f76ddb91e821abd156b878ebf5b8e7715307bf24c0d97`

## 🚀 Deployment

### Deploy Supabase Functions
```bash
# Deploy create order function
npx supabase functions deploy create-razorpay-order

# Deploy webhook function (no JWT verification for webhooks)
npx supabase functions deploy payment-webhook --no-verify-jwt
```

### Set Environment Variables
```bash
npx supabase secrets set RAZORPAY_KEY_ID=your_key_id
npx supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret
npx supabase secrets set RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

## 🧪 Testing

### Test Webhook Endpoint
```bash
curl -X POST https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-razorpay-signature: your_signature" \
  -d '{"event": "payment.captured", "payload": {...}}'
```

### Test Payment Flow
1. Start development server: `npm run dev`
2. Sign in to the app
3. Try to access code generation
4. Complete test payment
5. Verify access is granted

## 📈 Monitoring

### Check Payment Status
```sql
-- View recent payments
SELECT * FROM payments 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Monitor Webhook Logs
- Check Supabase function logs for webhook events
- Monitor Razorpay dashboard for webhook delivery status
- Verify payment status updates in database

## 🆘 Troubleshooting

### Common Issues

#### 1. "String did not match expected pattern"
- **Cause**: Webhook signature verification failed
- **Solution**: Verify webhook secret matches in both Razorpay and Supabase

#### 2. Payment succeeds but no access
- **Cause**: Webhook not receiving events or database update failed
- **Solution**: Check webhook configuration and database logs

#### 3. Webhook returns 401 error
- **Cause**: Function requires authentication
- **Solution**: Deploy with `--no-verify-jwt` flag

### Debug Steps
1. Check browser console for errors
2. Verify Supabase function logs
3. Test webhook endpoint manually
4. Check Razorpay webhook delivery status
5. Verify database payment records

## 🔒 Security Best Practices

1. **Never expose private keys** in frontend code
2. **Always verify webhook signatures** before processing
3. **Use HTTPS** for all webhook endpoints
4. **Implement rate limiting** for webhook endpoints
5. **Log all webhook events** for audit trails
6. **Use Row Level Security** for database access

## 📚 API Reference

### Create Order Function
- **Endpoint**: `/functions/v1/create-razorpay-order`
- **Method**: POST
- **Auth**: Required (JWT token)
- **Body**: `{ "amount": 9900 }`
- **Response**: `{ "order_id": "...", "amount": 9900, "currency": "INR", "key": "..." }`

### Webhook Function
- **Endpoint**: `/functions/v1/payment-webhook`
- **Method**: POST
- **Auth**: Not required (webhook signature verification)
- **Headers**: `x-razorpay-signature`
- **Body**: Razorpay webhook payload
- **Response**: `{ "success": true }`

## 🎉 Success Metrics

- ✅ Users can pay ₹99 for code access
- ✅ 24-hour access period works correctly
- ✅ Webhook verification is secure
- ✅ Payment status updates automatically
- ✅ No unauthorized access to code generation

This payment system provides a secure, reliable way to monetize your HTML Creator App while ensuring users get value for their payment! 🚀
