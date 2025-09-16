# 🚀 Express Backend Setup Guide

This guide will help you set up the Express.js backend for handling Razorpay webhook payments.

## 📋 Prerequisites

- Node.js 18+ installed
- Your Razorpay API keys
- Supabase project with payments table
- Frontend app running on port 5173

## 🔧 Step-by-Step Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
cp env.example .env
```

Edit the `.env` file with your actual values:
```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyOTEsImV4cCI6MjA3MzQ0MTI5MX0.IuoCjL8aFh2hXSCWFkKP43wHVwUlmPXE9zYjf9j0zi0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZtYWJ6c21pZHd2anhyc2xlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg2NTI5MSwiZXhwIjoyMDczNDQxMjkxfQ.0jBPt0Q2JSsJDvxVjy7jFltGm-YDn9gfX9VJHKVI1LU

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
RAZORPAY_KEY_SECRET=6RBE9BbkUU3AYxZs111Rd41m
RAZORPAY_WEBHOOK_SECRET=f9cc7f1d8207ac64112f76ddb91e821abd156b878ebf5b8e7715307bf24c0d97

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start the Backend Server
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3001
📊 Health check: http://localhost:3001/health
🔗 Webhook endpoint: http://localhost:3001/api/webhook/razorpay
💳 Payment API: http://localhost:3001/api/payment
🌍 Environment: development
```

### Step 5: Update Razorpay Webhook URL

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **Webhooks**
3. Update your webhook URL to: `http://localhost:3001/api/webhook/razorpay` (for development)
4. For production, use: `https://your-domain.com/api/webhook/razorpay`
5. Keep the same webhook secret: `f9cc7f1d8207ac64112f76ddb91e821abd156b878ebf5b8e7715307bf24c0d97`

### Step 6: Test the Setup

#### Test Health Check
```bash
curl http://localhost:3001/health
```

#### Test Webhook Endpoint
```bash
curl -X POST http://localhost:3001/api/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

#### Test Payment Order Creation
```bash
curl -X POST http://localhost:3001/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 9900, "userId": "test-user-id"}'
```

## 🎯 Frontend Integration

The frontend has been updated to use the Express backend:

### Updated Endpoints
- **Create Order**: `http://localhost:3001/api/payment/create-order`
- **Check Status**: `http://localhost:3001/api/payment/user/{userId}/active`

### No Changes Required
The frontend will automatically use the new Express backend endpoints.

## 🧪 Testing the Complete Flow

### 1. Start Both Servers
```bash
# Terminal 1: Start Express backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd ../
npm run dev
```

### 2. Test Payment Flow
1. Open http://localhost:5173
2. Sign in to your app
3. Try to access code generation
4. Complete a test payment
5. Verify access is granted

### 3. Monitor Logs
Check the Express backend logs for:
- Payment order creation
- Webhook events
- Database updates
- Any errors

## 🚀 Production Deployment

### 1. Environment Variables
Update your production `.env`:
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
```

### 2. Update Razorpay Webhook
Set webhook URL to your production domain:
```
https://your-backend-domain.com/api/webhook/razorpay
```

### 3. Deploy Options
- **Vercel** - Serverless deployment
- **Railway** - Container deployment
- **DigitalOcean** - VPS deployment
- **AWS/GCP** - Cloud deployment

## 🔍 Monitoring

### Health Check
Monitor server health:
```bash
curl https://your-backend-domain.com/health
```

### Logs
Monitor application logs for:
- Webhook events
- Payment processing
- Error rates
- Performance metrics

## 🆘 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

#### 2. Environment Variables Not Loaded
- Ensure `.env` file exists in backend directory
- Check file permissions
- Verify variable names match exactly

#### 3. Database Connection Error
- Verify Supabase credentials
- Check network connectivity
- Ensure service role key has proper permissions

#### 4. Razorpay API Error
- Verify API keys are correct
- Check if keys are for the right environment (test/live)
- Ensure webhook secret matches

### Debug Commands
```bash
# Check if server is running
curl http://localhost:3001/health

# Test webhook endpoint
curl -X POST http://localhost:3001/api/webhook/test

# Check logs
tail -f logs/app.log  # if logging to file
```

## 🎉 Success Indicators

- ✅ Backend server starts without errors
- ✅ Health check returns 200 OK
- ✅ Webhook test endpoint works
- ✅ Payment order creation works
- ✅ Frontend can communicate with backend
- ✅ Razorpay webhook URL updated
- ✅ Payment flow completes successfully

## 📚 Next Steps

1. **Test thoroughly** in development
2. **Deploy to production** when ready
3. **Monitor webhook delivery** in Razorpay dashboard
4. **Set up logging** for production monitoring
5. **Configure alerts** for payment failures

Your Express.js backend is now ready to handle Razorpay webhook payments with better control and flexibility! 🚀
