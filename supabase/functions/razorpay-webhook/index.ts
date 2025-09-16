import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')
    
    console.log('Webhook received:', {
      method: req.method,
      hasSignature: !!signature,
      hasWebhookSecret: !!webhookSecret,
      bodyLength: body.length
    });

    if (!signature || !webhookSecret) {
      return new Response(
        JSON.stringify({ error: 'Missing signature or webhook secret' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verify webhook signature using HMAC-SHA256
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const expectedSignature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(body)
    )
    
    const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (signature !== expectedSignatureHex) {
      console.error('Invalid webhook signature')
      console.error('Expected:', expectedSignatureHex)
      console.error('Received:', signature)
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const event = JSON.parse(body)
    console.log('Webhook event received:', event.event)

    // Create a Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Handle payment success
    if (event.event === 'payment.captured') {
      const paymentData = event.payload.payment.entity
      const orderId = paymentData.order_id

      // Update payment status to completed
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({
          status: 'completed',
          razorpay_payment_id: paymentData.id
        })
        .eq('razorpay_order_id', orderId)

      if (updateError) {
        console.error('Error updating payment status:', updateError)
        return new Response(
          JSON.stringify({ error: 'Failed to update payment status' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('Payment marked as completed for order:', orderId)
    }

    // Handle payment failure
    if (event.event === 'payment.failed') {
      const paymentData = event.payload.payment.entity
      const orderId = paymentData.order_id

      // Update payment status to failed
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({
          status: 'failed',
          razorpay_payment_id: paymentData.id
        })
        .eq('razorpay_order_id', orderId)

      if (updateError) {
        console.error('Error updating payment status:', updateError)
        return new Response(
          JSON.stringify({ error: 'Failed to update payment status' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('Payment marked as failed for order:', orderId)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
