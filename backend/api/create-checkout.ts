import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, plan } = req.body as { email: string; plan: 'monthly' | 'yearly' };

  if (!email || !plan) {
    return res.status(400).json({ error: 'email and plan are required' });
  }

  const priceId =
    plan === 'yearly'
      ? process.env.STRIPE_PRICE_YEARLY
      : process.env.STRIPE_PRICE_MONTHLY;

  if (!priceId) {
    return res.status(500).json({ error: 'Price not configured' });
  }

  try {
    // Reuse existing Stripe customer if one exists for this email
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    const customerId = existingCustomers.data[0]?.id;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.APP_URL}?premium=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}?premium=cancel`,
      subscription_data: {
        metadata: { email },
      },
      allow_promotion_codes: true,
      locale: 'ro',
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('create-checkout error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
