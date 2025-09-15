# Payment Integration Setup

This document explains how to set up the RazorPay payment integration for the HTML Creator App.

## Features Implemented

- ✅ RazorPay payment integration with live API keys
- ✅ Paywall for code preview section
- ✅ Payment status tracking in Supabase database
- ✅ User authentication required before payment
- ✅ One-time payment of ₹99 for lifetime access
- ✅ Secure payment processing with RazorPay

## Setup Instructions

### 1. Database Setup

Run the following SQL in your Supabase SQL editor to create the payments table:

```sql
-- See supabase/migrations/001_create_payments_table.sql
```

### 2. RazorPay Configuration

The app is already configured with the provided RazorPay live keys:
- **Key ID**: `rzp_live_RHkUFiZGyLjYhx`
- **Key Secret**: `6RBE9BbkUU3AYxZs111Rd41m`

### 3. How It Works

1. **User Authentication**: Users must be logged in to access the code section
2. **Payment Check**: The app checks if the user has made a successful payment
3. **Paywall Display**: If no payment is found, a paywall is shown with payment options
4. **Payment Processing**: Users can pay ₹99 using RazorPay
5. **Access Granted**: After successful payment, users can download their website code

### 4. Payment Flow

1. User clicks on "Code" tab
2. If not logged in → Shows login prompt
3. If logged in but not paid → Shows paywall
4. User clicks "Pay ₹99 to Unlock Code"
5. RazorPay payment modal opens
6. After successful payment → User gets access to code download

### 5. Database Schema

The `payments` table tracks:
- `user_id`: Links to authenticated user
- `razorpay_payment_id`: RazorPay's payment ID
- `razorpay_order_id`: RazorPay's order ID
- `amount`: Payment amount in paise (9900 = ₹99)
- `currency`: Payment currency (INR)
- `status`: Payment status (pending, completed, failed, cancelled)
- `created_at` / `updated_at`: Timestamps

### 6. Security Features

- Row Level Security (RLS) enabled on payments table
- Users can only access their own payment records
- Secure RazorPay integration with proper error handling
- Payment status validation

### 7. Components Added

- `PaymentService`: Handles all payment-related operations
- `PaymentModal`: Full-screen payment modal with features list
- `Paywall`: Compact paywall shown in code section
- `usePayment`: React hook for payment state management

### 8. Testing

To test the payment flow:
1. Sign up/login to the app
2. Click on "Code" tab
3. You should see the paywall
4. Click "Pay ₹99 to Unlock Code"
5. Complete the RazorPay payment
6. After successful payment, you should have access to the code section

### 9. Production Considerations

- The RazorPay keys are already configured for live payments
- All payments are processed through RazorPay's secure infrastructure
- Payment status is tracked in your Supabase database
- Users get lifetime access after one successful payment

## Troubleshooting

### Payment Not Working
- Check if RazorPay script is loading properly
- Verify API keys are correct
- Check browser console for errors
- Ensure Supabase connection is working

### Database Issues
- Verify the payments table exists
- Check RLS policies are set up correctly
- Ensure user authentication is working

### UI Issues
- Check if all components are imported correctly
- Verify payment status is being fetched properly
- Check if user authentication state is correct
