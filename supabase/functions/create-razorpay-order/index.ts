import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the user from the JWT token
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get request body
    const { amount = 9900 } = await req.json() // Default to ₹99 (9900 paise)

    // Create payment record in database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        amount: amount,
        currency: 'INR',
        status: 'pending'
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create Razorpay order
    console.log('Creating Razorpay order for amount:', amount);
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${Deno.env.get('RAZORPAY_KEY_ID')}:${Deno.env.get('RAZORPAY_KEY_SECRET')}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        receipt: payment.id,
        notes: {
          user_id: user.id,
          payment_id: payment.id
        }
      })
    })

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('Razorpay API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create Razorpay order', details: errorText }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const orderData = await razorpayResponse.json()
    console.log('Razorpay order created successfully:', orderData.id);

    // Update payment record with Razorpay order ID
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({ razorpay_order_id: orderData.id })
      .eq('id', payment.id)

    if (updateError) {
      console.error('Error updating payment record:', updateError)
    }

    return new Response(
      JSON.stringify({
        order_id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        key: Deno.env.get('RAZORPAY_KEY_ID')
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
