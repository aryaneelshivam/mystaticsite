# 🚀 HTML Creator Backend - Express.js with Razorpay Webhooks

This Express.js backend handles Razorpay webhook payments for the HTML Creator App, providing a more flexible and maintainable solution than Supabase Edge Functions.

## 📋 Features

- ✅ **Express.js Server** - Robust Node.js backend
- ✅ **Razorpay Integration** - Complete payment processing
- ✅ **Webhook Handling** - Secure signature verification
- ✅ **Supabase Integration** - Database operations
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **Security Middleware** - Helmet, CORS, etc.
- ✅ **Comprehensive Logging** - Request/response tracking
- ✅ **Error Handling** - Graceful error management

## 🏗️ Architecture

```
Frontend → Express API → Razorpay → Webhook → Database
```

### Components:
1. **Express Server** - Main application server
2. **Webhook Routes** - Razorpay webhook handling
3. **Payment Routes** - Payment order creation and status
4. **Supabase Client** - Database operations
5. **Razorpay Client** - Payment processing

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp env.example .env
# Edit .env with your actual values
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://ajafmabzsmidwvjxrsle.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_live_RHkUFiZGyLjYhx
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## 📚 API Endpoints

### Health Check
```
GET /health
```
Returns server status and uptime information.

### Payment Endpoints

#### Create Payment Order
```
POST /api/payment/create-order
```
**Body:**
```json
{
  "amount": 9900,
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "order_id": "order_xyz",
  "amount": 9900,
  "currency": "INR",
  "key": "rzp_live_...",
  "payment_id": "payment-uuid"
}
```

#### Check Payment Status
```
GET /api/payment/status/:orderId
```

#### Check User Active Payment
```
GET /api/payment/user/:userId/active
```

#### Verify Payment
```
POST /api/payment/verify
```

#### Get Payment History
```
GET /api/payment/user/:userId/history?limit=10&offset=0
```

### Webhook Endpoints

#### Razorpay Webhook
```
POST /api/webhook/razorpay
```
Handles Razorpay webhook events:
- `payment.captured`
- `payment.failed`
- `order.paid`

#### Webhook Test
```
POST /api/webhook/test
```

#### Webhook Status
```
GET /api/webhook/status
```

## 🔐 Security Features

### 1. Webhook Signature Verification
```javascript
const verifyWebhookSignature = (body, signature) => {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');
  
  return signature === expectedSignature;
};
```

### 2. Rate Limiting
- **Webhook endpoints**: 100 requests per 15 minutes per IP
- **General endpoints**: 1000 requests per 15 minutes per IP

### 3. Security Headers
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Request size limits** - 10MB max

### 4. Error Handling
- Comprehensive error logging
- Graceful error responses
- No sensitive data exposure in production

## 🔄 Webhook Processing

### Payment Captured Event
```javascript
async function handlePaymentCaptured(event) {
  const paymentData = event.payload.payment.entity;
  const orderId = paymentData.order_id;
  const paymentId = paymentData.id;

  // Update payment status in database
  await db.updatePaymentStatus(orderId, 'completed', paymentId);
  
  // Additional business logic can be added here
}
```

### Payment Failed Event
```javascript
async function handlePaymentFailed(event) {
  const paymentData = event.payload.payment.entity;
  const orderId = paymentData.order_id;
  const paymentId = paymentData.id;

  // Update payment status in database
  await db.updatePaymentStatus(orderId, 'failed', paymentId);
  
  // Handle failure logic
}
```

## 🧪 Testing

### Test Webhook Endpoint
```bash
curl -X POST http://localhost:3001/api/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Test Health Check
```bash
curl http://localhost:3001/health
```

### Test Payment Order Creation
```bash
curl -X POST http://localhost:3001/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 9900, "userId": "test-user-id"}'
```

## 📊 Monitoring

### Logs
The server logs all requests and webhook events:
- Request/response details
- Webhook signature verification
- Payment status updates
- Error details

### Health Check
Monitor server health at `/health` endpoint:
```json
{
  "status": "OK",
  "timestamp": "2025-01-16T15:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔧 Razorpay Webhook Configuration

### Webhook URL
```
https://your-domain.com/api/webhook/razorpay
```

### Events to Subscribe
- `payment.captured`
- `payment.failed`
- `order.paid`

### Webhook Secret
Use the same secret configured in your `.env` file.

## 🆘 Troubleshooting

### Common Issues

#### 1. Webhook Signature Verification Failed
- **Cause**: Webhook secret mismatch
- **Solution**: Verify `RAZORPAY_WEBHOOK_SECRET` in `.env` matches Razorpay dashboard

#### 2. Database Connection Error
- **Cause**: Invalid Supabase credentials
- **Solution**: Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

#### 3. Razorpay API Error
- **Cause**: Invalid Razorpay credentials
- **Solution**: Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

#### 4. CORS Error
- **Cause**: Frontend URL not allowed
- **Solution**: Update `FRONTEND_URL` in `.env`

### Debug Steps
1. Check server logs for errors
2. Verify environment variables
3. Test webhook endpoint manually
4. Check Razorpay webhook delivery status
5. Verify database connectivity

## 📈 Performance

### Optimizations
- **Rate limiting** prevents abuse
- **Request size limits** prevent DoS
- **Efficient database queries** with proper indexing
- **Connection pooling** for database connections

### Monitoring
- Request/response times
- Error rates
- Webhook processing times
- Database query performance

## 🔒 Security Best Practices

1. **Never expose private keys** in logs or responses
2. **Always verify webhook signatures** before processing
3. **Use HTTPS** in production
4. **Implement proper rate limiting**
5. **Log all webhook events** for audit trails
6. **Validate all input data**
7. **Use environment variables** for sensitive data

## 🎯 Benefits Over Supabase Edge Functions

1. **More Control** - Full control over request/response handling
2. **Better Debugging** - Comprehensive logging and error handling
3. **Flexibility** - Easy to add new features and endpoints
4. **Performance** - Optimized for webhook processing
5. **Maintainability** - Standard Express.js patterns
6. **Testing** - Easier to write and run tests
7. **Deployment** - More deployment options available

## 📚 Dependencies

### Production Dependencies
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `dotenv` - Environment variables
- `@supabase/supabase-js` - Supabase client
- `razorpay` - Razorpay SDK
- `express-rate-limit` - Rate limiting
- `morgan` - HTTP request logger

### Development Dependencies
- `nodemon` - Development server with auto-reload

## 🎉 Success Metrics

- ✅ Webhook signature verification working
- ✅ Payment status updates automatically
- ✅ 24-hour access control functioning
- ✅ Comprehensive error handling
- ✅ Security measures in place
- ✅ Performance optimized
- ✅ Easy to maintain and extend

This Express.js backend provides a robust, secure, and maintainable solution for handling Razorpay webhook payments! 🚀
