import { NextResponse } from "next/server";

const paypalBaseUrl = "https://api-m.paypal.com";
;

async function getAccessToken() {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials'
      }).toString()
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal token error:', errorData);
      throw new Error(`PayPal token error: ${errorData.error_description || 'Unknown error'}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token received from PayPal');
    }

    return data.access_token;
  } catch (error) {
    console.error('PayPal authentication error:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
          description: 'Donation payment',
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cancel`,
        brand_name: 'FGRF Donations',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
      },
    };

    const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('PayPal order creation error:', data);
      throw new Error(data.message || 'PayPal order creation failed');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
