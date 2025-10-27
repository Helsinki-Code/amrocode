# 🚀 AmroCode - Complete Setup Instructions

## ✅ DATABASE - ALREADY CONFIGURED!
Your Neon PostgreSQL database is already set in `.env.local`:
```
POSTGRES_URL=postgresql://neondb_owner:npg_GAjnedJs9hC2@ep-misty-tooth-a4e9q3ck-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

---

## 📋 STEP-BY-STEP SETUP GUIDE

### 1️⃣ GENERATE SECURITY KEYS (DO THIS NOW!)

Open terminal and run these commands:

```bash
# Generate JWE_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copy the outputs and paste them in `.env.local`:**
- First output → `JWE_SECRET`
- Second output → `ENCRYPTION_KEY`

---

### 2️⃣ STRIPE SETUP (REQUIRED FOR PAYMENTS)

#### A) Get Stripe Secret Key
1. Go to: https://dashboard.stripe.com/register (create account if needed)
2. Navigate to: **Developers → API Keys**
3. Copy **Secret key** (starts with `sk_test_`)
4. Paste in `.env.local` as `STRIPE_SECRET_KEY`

#### B) Create £499/month Product
1. Go to: https://dashboard.stripe.com/test/products
2. Click **"Add Product"**
3. Fill in:
   - **Name**: `AmroCode Unlimited Access`
   - **Description**: `Unlimited AI coding with all premium models`
   - **Pricing**:
     - Price: `£499.00`
     - Currency: `GBP`
     - Billing period: `Monthly`
     - Recurring
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)
6. Paste in `.env.local` as `STRIPE_PRICE_ID`

#### C) Setup Webhook (DO AFTER DEPLOYMENT - Use Stripe CLI for local testing)
**For Local Testing:**
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/stripe/webhook
# This outputs a webhook secret → Copy to STRIPE_WEBHOOK_SECRET in .env.local
```

**For Production:**
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy **Signing secret** (starts with `whsec_`)
7. Paste in `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

### 3️⃣ VERCEL SANDBOX (REQUIRED FOR CODE EXECUTION)

#### A) Get Vercel Token
1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `AmroCode Sandbox`
4. Scope: **Full Account**
5. Click **Create**
6. Copy the token
7. Paste in `.env.local` as `SANDBOX_VERCEL_TOKEN`

#### B) Get Team ID
1. Go to: https://vercel.com/teams
2. Click on your team name
3. Go to **Settings**
4. Look for **Team ID** (or check the URL: `vercel.com/teams/TEAM_ID/...`)
5. Copy the Team ID
6. Paste in `.env.local` as `SANDBOX_VERCEL_TEAM_ID`

#### C) Get Project ID
1. Create a new Vercel project (or use existing)
2. Go to project **Settings**
3. Copy the **Project ID** (shown in settings)
4. Paste in `.env.local` as `SANDBOX_VERCEL_PROJECT_ID`

---

### 4️⃣ GITHUB OAUTH (REQUIRED FOR USER LOGIN)

#### Create GitHub OAuth App
1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `AmroCode`
   - **Homepage URL**: `http://localhost:3000` (change for production)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/github/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Paste in `.env.local` as `NEXT_PUBLIC_GITHUB_CLIENT_ID`
7. Click **"Generate a new client secret"**
8. Copy the **Client Secret**
9. Paste in `.env.local` as `GITHUB_CLIENT_SECRET`

---

### 5️⃣ INITIALIZE DATABASE

Run these commands in your terminal:

```bash
# Install dependencies (if not already done)
npm install

# Push database schema to Neon
npm run db:push
```

This creates all required tables:
- `users` - User accounts
- `subscriptions` - Payment & subscription data
- `tasks` - AI coding tasks
- `connectors` - MCP servers
- `accounts` - Linked accounts
- `keys` - API keys
- `settings` - User settings
- `task_messages` - Chat messages

---

### 6️⃣ START THE APP

```bash
npm run dev
```

Visit: http://localhost:3000

You should see the **beautiful AmroCode landing page**! 🎉

---

## 🧪 TESTING THE COMPLETE FLOW

### Test User Registration & Payment:
1. **Visit** `http://localhost:3000`
2. **Click** "Start Building Now"
3. **Sign in** with GitHub (will redirect to GitHub OAuth)
4. After signing in, **click** "Start Building Now" again
5. **Redirected** to Stripe Checkout
6. **Use test card**: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
7. **Complete payment**
8. **Redirected** to success page
9. **Click** "Start Coding Now"
10. **Access granted** to `/app` - Full AI coding interface!

---

## 🔐 SECURITY CHECKLIST

✅ Database secured with SSL
✅ All secrets in `.env.local` (NOT committed to git)
✅ Webhook signature verification
✅ Session encryption with JWE
✅ API keys encrypted at rest
✅ OAuth with secure callback URLs

---

## 📁 WHAT YOU HAVE NOW

### Landing Page Features:
- 🎨 Animated hero with live terminal demo
- 📊 Before/after code transformation showcase
- 🤖 Interactive AI models selector
- 💎 Premium £499/month pricing section
- 📱 Fully responsive design
- ✨ Neon/Cyan brand colors

### Payment System:
- 💳 Stripe checkout integration
- 🔄 Recurring £499/month subscriptions
- ✅ Automatic webhook processing
- 🔒 Secure payment verification
- 📊 Subscription status tracking

### Access Control:
- 🚫 Landing page for non-subscribers
- ✅ `/app` route for paid users only
- 🔐 Real-time subscription verification
- 🎉 Success page after payment

---

## 🐛 TROUBLESHOOTING

### "Module not found: @/lib/db"
✅ **FIXED** - Created `lib/db/index.ts`

### "POSTGRES_URL environment variable is required"
- Make sure `.env.local` exists in root directory
- Restart dev server: `npm run dev`

### Stripe webhook not working locally
- Install Stripe CLI
- Run: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Copy the webhook signing secret to `.env.local`

### GitHub OAuth redirect error
- Check callback URL matches: `http://localhost:3000/api/auth/github/callback`
- Make sure `NEXT_PUBLIC_GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set

### Database connection error
- Your Neon database should be running
- Check the URL is correct in `.env.local`
- Make sure `npm run db:push` completed successfully

---

## 🚀 GOING TO PRODUCTION

### 1. Update Environment Variables:
- Change GitHub OAuth callback to production URL
- Switch Stripe to **Live Mode** keys
- Update webhook URL to production domain
- Set production Vercel project ID

### 2. Deploy to Vercel:
```bash
vercel --prod
```

### 3. Configure Webhooks:
- Update Stripe webhook URL to production
- Test payment flow in production

### 4. Monitor:
- Check Stripe Dashboard for payments
- Monitor Vercel logs
- Check Neon database console

---

## 💡 NEXT STEPS AFTER SETUP

1. **Customize branding** - Update colors, logos
2. **Add more AI models** - Integrate additional providers
3. **Analytics** - Add Vercel Analytics, Google Analytics
4. **SEO** - Add meta tags, sitemap
5. **Email notifications** - Setup for payments, tasks
6. **Customer portal** - Enable Stripe billing portal for self-service
7. **Teams** - Add team collaboration features

---

## 📞 NEED HELP?

- **Stripe**: https://support.stripe.com
- **Vercel**: https://vercel.com/support
- **Neon**: https://neon.tech/docs
- **GitHub OAuth**: https://docs.github.com/en/developers/apps

---

## 🎉 YOU'RE ALL SET!

Your AmroCode platform is now ready to:
- ✅ Accept £499/month subscriptions via Stripe
- ✅ Authenticate users via GitHub
- ✅ Gate access to premium AI coding features
- ✅ Execute code in Vercel sandboxes
- ✅ Process payments securely
- ✅ Scale to thousands of users

**Welcome to the future of AI-powered coding! 🚀**
