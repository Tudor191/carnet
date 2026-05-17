import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const email = req.query.email as string;
  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) {
      return res.status(200).json({ isPremium: false });
    }

    const customerId = customers.data[0].id;
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    const active = subscriptions.data.length > 0;
    const sub = subscriptions.data[0];

    return res.status(200).json({
      isPremium: active,
      plan: active ? (sub.items.data[0]?.price.recurring?.interval === 'year' ? 'yearly' : 'monthly') : null,
      currentPeriodEnd: active ? new Date(sub.current_period_end * 1000).toISOString() : null,
    });
  } catch (err: any) {
    console.error('check-premium error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
