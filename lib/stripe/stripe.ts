import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})

export const STRIPE_PLAN = {
  name: 'Unlimited Access',
  priceId: process.env.STRIPE_PRICE_ID!,
  price: 499,
  currency: 'GBP',
  interval: 'month',
  features: [
    'Unlimited AI coding tasks',
    'All AI models (Claude, GPT-4, Codex, Gemini, Cursor)',
    'Priority support',
    'Advanced sandbox features',
    'MCP server integration',
    'Custom API keys support',
    'Cancel anytime',
  ],
}
