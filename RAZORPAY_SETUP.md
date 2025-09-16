# Razorpay Payment Integration Setup

This guide will help you set up Razorpay payments for the HTML Creator App, where users need to pay ₹99 to access code generation.

## Prerequisites

1. A Razorpay account (sign up at [razorpay.com](https://razorpay.com))
2. Supabase project with the payments table already created
3. Node.js and npm installed

## Step 1: Razorpay Account Setup

### 1.1 Create Razorpay Account
1. Go to [razorpay.com](https://razorpay.com) and sign up
2. Complete the KYC process
3. Activate your account

### 1.2 Get API Keys
1. Go to your Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Generate API Keys (Test mode for development, Live mode for production)
4. Copy your **Key ID** and **Key Secret**

### 1.3 Set Up Webhook
1. Go to **Settings** → **Webhooks**
2. Click **Add New Webhook**
3. Set the webhook URL to: `https://your-project-ref.supabase.co/functions/v1/razorpay-webhook`
4. Select events: `payment.captured` and `payment.failed`
5. Copy the webhook secret

## Step 2: Environment Variables

### 2.1 Frontend Environment Variables
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration (already configured)
VITE_SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyOTEsImV4cCI6MjA3MzQ0MTI5MX0.IuoCjL8aFh2hXSCWFkKP43wHVwUlmPXE9zYjf9j0zi0

# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

### 2.2 Supabase Functions Environment Variables
Set these in your Supabase project dashboard under **Settings** → **Edge Functions** → **Environment Variables**:

```bash
# Supabase Configuration
SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyOTEsImV4cCI6MjA3MzQ0MTI5MX0.IuoCjL8aFh2hXSCWFkKP43wHVwUlmPXE9zYjf9j0zi0
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Razorpay Server-side Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here
```

## Step 3: Deploy Supabase Functions

### 3.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 3.2 Login to Supabase
```bash
supabase login
```

### 3.3 Link Your Project
```bash
supabase link --project-ref ajafmabzsmidwvjxrsle
```

### 3.4 Deploy Functions
```bash
# Deploy the create order function
supabase functions deploy create-razorpay-order

# Deploy the webhook function
supabase functions deploy razorpay-webhook
```

## Step 4: Test the Integration

### 4.1 Test Payment Flow
1. Start your development server: `npm run dev`
2. Sign in to your app
3. Try to access the code generation tab
4. You should see the payment modal
5. Use Razorpay test cards for testing

### 4.2 Test Webhook
1. Make a test payment
2. Check your Supabase logs to ensure the webhook is being called
3. Verify that the payment status is updated in the database

## Step 5: Production Setup

### 5.1 Switch to Live Mode
1. In Razorpay dashboard, switch to **Live Mode**
2. Update your environment variables with live keys
3. Update webhook URL to production URL
4. Redeploy your functions

### 5.2 Security Considerations
- Never expose your Razorpay Key Secret in frontend code
- Always verify webhook signatures
- Use HTTPS in production
- Implement proper error handling

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**
   - Check webhook URL is correct
   - Verify webhook secret is set correctly
   - Check Supabase function logs

2. **Payment not updating status**
   - Verify webhook is configured for correct events
   - Check database permissions
   - Verify service role key has proper permissions

3. **Frontend payment not working**
   - Check Razorpay Key ID is set correctly
   - Verify Supabase functions are deployed
   - Check browser console for errors

### Debug Steps
1. Check Supabase function logs: `supabase functions logs create-razorpay-order`
2. Check webhook logs: `supabase functions logs razorpay-webhook`
3. Verify database records in the payments table
4. Test with Razorpay test cards

## Payment Flow

1. User clicks "Pay ₹99 to Access Code"
2. Frontend calls `create-razorpay-order` function
3. Function creates payment record and Razorpay order
4. Razorpay checkout opens
5. User completes payment
6. Razorpay sends webhook to `razorpay-webhook` function
7. Webhook updates payment status to "completed"
8. User gains access to code generation for 24 hours

## Support

For issues with:
- **Razorpay**: Check [Razorpay Documentation](https://razorpay.com/docs/)
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **This Integration**: Check the troubleshooting section above
