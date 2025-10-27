# AmroCode Stripe Integration Setup

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_PRICE_ID=price_... # Your Stripe price ID for the £499/month plan
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook secret

# Existing variables (already configured)
POSTGRES_URL=...
SANDBOX_VERCEL_TOKEN=...
SANDBOX_VERCEL_TEAM_ID=...
SANDBOX_VERCEL_PROJECT_ID=...
JWE_SECRET=...
ENCRYPTION_KEY=...
```

## Stripe Setup Steps

### 1. Create Stripe Account
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete signup
3. Navigate to Developers → API Keys
4. Copy your **Secret key** → use for `STRIPE_SECRET_KEY`

### 2. Create Product & Price
1. Go to Products → Add Product
2. Set name: **"AmroCode Unlimited Access"**
3. Set description: **"Unlimited access to AmroCode AI coding platform"**
4. Set pricing:
   - Price: **£499.00**
   - Billing period: **Monthly**
   - Currency: **GBP**
5. Click Save
6. Copy the **Price ID** (starts with `price_`) → use for `STRIPE_PRICE_ID`

### 3. Set up Webhook
1. Go to Developers → Webhooks
2. Click **Add endpoint**
3. Set endpoint URL: `https://your-domain.com/api/stripe/webhook`
   - For local testing: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) or ngrok
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click Add endpoint
6. Copy the **Signing secret** (starts with `whsec_`) → use for `STRIPE_WEBHOOK_SECRET`

### 4. Test Mode vs Live Mode
- Use **Test mode** keys (start with `sk_test_`) during development
- Switch to **Live mode** keys (start with `sk_live_`) for production
- Test cards: Use `4242 4242 4242 4242` with any future date and CVC

## Database Migration

Run this to create the subscriptions table:

```bash
npm run db:push
```

This creates the `subscriptions` table with fields:
- `id` - Subscription ID
- `userId` - User reference
- `stripeCustomerId` - Stripe customer ID
- `stripeSubscriptionId` - Stripe subscription ID
- `stripePriceId` - Price ID
- `status` - Subscription status (active, canceled, past_due, etc.)
- `currentPeriodStart` - Billing period start
- `currentPeriodEnd` - Billing period end
- `cancelAtPeriodEnd` - Whether to cancel at period end

## How It Works

### User Flow
1. **Landing Page** (`/`) - Shows for non-subscribers
   - Beautiful animated landing page
   - Pricing section with £499/month plan
   - "Start Building Now" button

2. **Checkout** - User clicks subscribe button
   - Redirects to Stripe Checkout
   - Secure payment processing
   - Automatic subscription creation

3. **Success Page** (`/checkout/success`) - After payment
   - Confirmation message
   - Access granted notification
   - Redirect to app

4. **App Access** (`/app`) - Main coding interface
   - Only accessible to paid subscribers
   - Full access to all AI models
   - Unlimited tasks

### Subscription Verification
- Every request to `/app` checks subscription status
- Non-subscribers redirected to landing page with subscribe prompt
- Expired subscriptions automatically blocked
- Grace period for payment failures

### Webhook Events
- **checkout.session.completed** - Activates subscription after successful payment
- **customer.subscription.updated** - Updates subscription status changes
- **customer.subscription.deleted** - Cancels access when subscription ends
- **invoice.payment_failed** - Marks subscription as past_due

## Testing Locally

### Using Stripe CLI
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe
# Linux: Download from https://github.com/stripe/stripe-cli/releases

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# This will give you a webhook signing secret - add it to your .env.local
# Test the integration
stripe trigger checkout.session.completed
```

### Test Cards
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## Production Checklist

- [ ] Switch to Live mode in Stripe Dashboard
- [ ] Update `STRIPE_SECRET_KEY` with live key
- [ ] Update `STRIPE_PRICE_ID` with live price ID
- [ ] Update webhook endpoint to production URL
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production webhook secret
- [ ] Test complete flow in production
- [ ] Set up Stripe email notifications
- [ ] Configure Stripe billing portal for customer self-service
- [ ] Enable Stripe Radar for fraud protection

## Customer Management

### View Subscriptions
- Stripe Dashboard → Customers
- View all active/cancelled subscriptions
- Manual refunds and cancellations

### Cancel Subscription
- Customers can cancel via Stripe billing portal
- Webhook automatically updates database
- Access revoked at period end (if `cancelAtPeriodEnd` is true)

### Failed Payments
- Stripe automatically retries failed payments
- Sends email notifications to customers
- After all retries fail, subscription becomes `past_due`
- Webhook updates database and blocks access

## Security Notes

- Never commit `.env.local` to git
- Webhook signature verification prevents tampering
- All sensitive data encrypted at rest
- Stripe handles all payment details (PCI compliant)
- Regular security audits recommended

## Support

For Stripe issues:
- Stripe Dashboard → Help
- https://support.stripe.com
- https://stripe.com/docs

For AmroCode issues:
- Check application logs
- Verify webhook events received
- Check database subscription records
