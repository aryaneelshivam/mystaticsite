# 🔧 Payment Debug Guide

I've fixed several issues that could cause the "string did not match the expected pattern" error. Here's what was updated and how to debug further:

## ✅ Issues Fixed

### 1. Webhook Signature Verification
- **Problem**: Using SHA-256 instead of HMAC-SHA256
- **Fix**: Updated to use proper HMAC-SHA256 signature verification
- **Status**: ✅ Deployed

### 2. Enhanced Logging
- **Problem**: Limited error visibility
- **Fix**: Added comprehensive logging to both functions
- **Status**: ✅ Deployed

### 3. Better Error Handling
- **Problem**: Generic error messages
- **Fix**: Added detailed error responses
- **Status**: ✅ Deployed

## 🔍 How to Debug Payment Issues

### Step 1: Check Browser Console
1. Open your app in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Try to make a payment
5. Look for any error messages

### Step 2: Check Supabase Function Logs
```bash
# Check create order function logs
npx supabase functions logs create-razorpay-order

# Check webhook function logs
npx supabase functions logs razorpay-webhook
```

### Step 3: Verify Razorpay Configuration
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Check that your webhook is configured:
   - **URL**: `https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/razorpay-webhook`
   - **Events**: `payment.captured`, `payment.failed`
3. Verify the webhook secret matches what's in Supabase

### Step 4: Test Payment Flow
1. Start your app: `npm run dev`
2. Sign in and try to access code generation
3. Check console logs for detailed information
4. Complete a test payment

## 🚨 Common Issues & Solutions

### Issue: "String did not match expected pattern"
**Possible Causes:**
1. Webhook signature verification failed
2. Razorpay order creation failed
3. Invalid webhook secret

**Solutions:**
1. Check webhook secret in Supabase matches Razorpay dashboard
2. Verify Razorpay API keys are correct
3. Check function logs for detailed errors

### Issue: Payment modal doesn't open
**Possible Causes:**
1. Razorpay script not loading
2. Order creation failing
3. Invalid API keys

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify `VITE_RAZORPAY_KEY_ID` in `.env.local`
3. Check create order function logs

### Issue: Payment succeeds but access not granted
**Possible Causes:**
1. Webhook not receiving events
2. Webhook signature verification failing
3. Database update failing

**Solutions:**
1. Check webhook configuration in Razorpay dashboard
2. Verify webhook secret
3. Check webhook function logs

## 🔧 Manual Testing Steps

### Test 1: Order Creation
```bash
# Check if order creation works
curl -X POST https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/create-razorpay-order \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 9900}'
```

### Test 2: Webhook Endpoint
```bash
# Test webhook endpoint (should return signature error)
curl -X POST https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/razorpay-webhook \
  -H "Content-Type: application/json" \
  -H "x-razorpay-signature: test" \
  -d '{"event": "test"}'
```

## 📊 Monitoring

### Check Payment Status
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Check the `payments` table for recent entries
4. Verify payment status updates

### Check Razorpay Dashboard
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Check Payments section for recent transactions
3. Verify webhook delivery status

## 🎯 Next Steps

1. **Test the payment flow** with the updated functions
2. **Check logs** if issues persist
3. **Verify webhook configuration** in Razorpay dashboard
4. **Monitor payment status** in database

The updated functions now have better error handling and logging, which should help identify any remaining issues.

## 🆘 Still Having Issues?

If you're still experiencing problems:
1. Share the exact error message from browser console
2. Share the function logs from Supabase
3. Verify all environment variables are set correctly
4. Check that webhook is properly configured in Razorpay dashboard

The payment system should now work correctly with the fixes applied! 🚀
