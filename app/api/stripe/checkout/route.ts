import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PLAN } from '@/lib/stripe/stripe'
import { getServerSession } from '@/lib/session/get-server-session'
import { db } from '@/lib/db'
import { subscriptions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: userId, email } = session.user

    // Check if user already has an active subscription
    const existingSubscriptionResult = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1)

    const existingSubscription = existingSubscriptionResult[0]

    if (existingSubscription && existingSubscription.status === 'active') {
      return NextResponse.json({ error: 'You already have an active subscription' }, { status: 400 })
    }

    // Create or get Stripe customer
    let stripeCustomerId = existingSubscription?.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: email || undefined,
        metadata: {
          userId: userId,
        },
      })
      stripeCustomerId = customer.id

      // Create subscription record
      await db.insert(subscriptions).values({
        id: nanoid(),
        userId: userId,
        stripeCustomerId: stripeCustomerId,
        status: 'incomplete',
      })
    }

    // Create Stripe checkout session for recurring subscription
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: STRIPE_PLAN.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      metadata: {
        userId: userId,
      },
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
