# 🎯 Final Setup Steps - Almost Done!

Great! I've configured most of your Razorpay integration. Here's what's left to complete:

## ✅ What's Already Done

- ✅ Frontend environment variables configured
- ✅ Supabase functions deployed
- ✅ Razorpay Key ID and Secret set in Supabase
- ✅ Project linked to Supabase

## 🔧 Final Steps (2 minutes)

### Step 1: Set Service Role Key in Supabase Dashboard

Since Supabase CLI doesn't allow `SUPABASE_` prefixed environment variables, you need to set this manually:

1. Go to: https://supabase.com/dashboard/project/ajafmabzsmidwvjxrsle/functions
2. Click on **Environment Variables**
3. Add this variable:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg2NTI5MSwiZXhwIjoyMDczNDQxMjkxfQ.0jBPt0Q2JSsJDvxVjy7jFltGm-YDn9gfX9VJHKVI1LU`

### Step 2: Set Up Razorpay Webhook

1. Go to your [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **Webhooks**
3. Click **Add New Webhook**
4. Configure:
   - **URL**: `https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/razorpay-webhook`
   - **Events**: Select `payment.captured` and `payment.failed`
5. Copy the webhook secret
6. Go back to Supabase Functions → Environment Variables
7. Add:
   - **Name**: `RAZORPAY_WEBHOOK_SECRET`
   - **Value**: `your_webhook_secret_from_razorpay`

## 🚀 Test Your Payment System

Once you complete the above steps:

```bash
npm run dev
```

Then test the flow:
1. Sign in to your app
2. Try to access code generation
3. You should see the payment modal
4. Complete a test payment

## 🎉 You're Done!

After these final steps, your payment system will be fully functional:
- Users pay ₹99 to access code generation
- 24-hour access after successful payment
- Secure webhook verification
- Real-time payment status updates

## 🔍 Verify Everything is Working

Check that all environment variables are set in Supabase:
- ✅ `RAZORPAY_KEY_ID` = `rzp_live_RHkUFiZGyLjYhx`
- ✅ `RAZORPAY_KEY_SECRET` = `6RBE9BbkUU3AYxZs111Rd41m`
- ⏳ `SUPABASE_SERVICE_ROLE_KEY` = (set in dashboard)
- ⏳ `RAZORPAY_WEBHOOK_SECRET` = (set after webhook creation)

## 🆘 Need Help?

If you encounter any issues:
1. Check Supabase function logs: `npx supabase functions logs create-razorpay-order`
2. Verify webhook is receiving events in Razorpay dashboard
3. Check browser console for any errors

Your payment system is almost ready! 🚀
