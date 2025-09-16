# 🚀 Live Razorpay Setup Guide

Your Razorpay live API keys have been configured! Follow these steps to complete the setup.

## ✅ Your Razorpay Live Keys
- **Key ID**: `rzp_live_RHkUFiZGyLjYhx`
- **Key Secret**: `6RBE9BbkUU3AYxZs111Rd41m`

## Step 1: Configure Frontend Environment Variables

Create a `.env.local` file in your project root with this content:

```bash
# Supabase Configuration (already configured)
VITE_SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyOTEsImV4cCI6MjA3MzQ0MTI5MX0.IuoCjL8aFh2hXSCWFkKP43wHVwUlmPXE9zYjf9j0zi0

# Razorpay Live Configuration
VITE_RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
```

## Step 2: Get Supabase Service Role Key

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `ajafmabzsmidwvjxrsle`
3. Go to **Settings** → **API**
4. Copy the **service_role** key (not the anon key)

## Step 3: Set Up Razorpay Webhook

1. Go to your [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **Webhooks**
3. Click **Add New Webhook**
4. Set the webhook URL to: `https://ajafmabzsmidwvjxrsle.supabase.co/functions/v1/razorpay-webhook`
5. Select these events:
   - `payment.captured`
   - `payment.failed`
6. Copy the webhook secret

## Step 4: Configure Supabase Function Environment Variables

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `ajafmabzsmidwvjxrsle`
3. Go to **Settings** → **Edge Functions** → **Environment Variables**
4. Add these variables:

```bash
# Supabase Configuration
SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyOTEsImV4cCI6MjA3MzQ0MTI5MX0.IuoCjL8aFh2hXSCWFkKP43wHVwUlmPXE9zYjf9j0zi0
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Razorpay Live Configuration
RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
RAZORPAY_KEY_SECRET=6RBE9BbkUU3AYxZs111Rd41m
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

## Step 5: Deploy Supabase Functions

Run these commands in your terminal:

```bash
# Login to Supabase (if not already logged in)
npx supabase login

# Link your project
npx supabase link --project-ref ajafmabzsmidwvjxrsle

# Deploy the functions
npx supabase functions deploy create-razorpay-order
npx supabase functions deploy razorpay-webhook
```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Sign in to your app and try to access code generation

3. You should see the payment modal with ₹99 pricing

4. Use a real payment method to test (since these are live keys)

## 🔒 Security Notes

- **Never commit your `.env.local` file** - it contains sensitive keys
- The Key Secret is only used server-side in Supabase functions
- Webhook verification ensures payment authenticity
- All payments are processed securely through Razorpay

## 🎯 What Happens After Setup

1. Users see a payment modal when accessing code generation
2. After successful payment, they get 24-hour access
3. Webhooks automatically update payment status
4. Users can download their website code

## 🆘 Troubleshooting

### If payments aren't working:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check Supabase function logs: `npx supabase functions logs create-razorpay-order`
4. Verify webhook is receiving events in Razorpay dashboard

### If webhook isn't working:
1. Check webhook URL is correct
2. Verify webhook secret matches in Supabase
3. Check webhook logs: `npx supabase functions logs razorpay-webhook`

## 🎉 You're Ready!

Once you complete these steps, your payment system will be live and processing real payments. Users will be able to pay ₹99 to access code generation for 24 hours.

**Remember**: These are live keys, so all payments will be real transactions!
