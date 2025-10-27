import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/stripe'
import { db } from '@/lib/db'
import { subscriptions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const userId = session.metadata?.userId

        if (userId && customerId) {
          // Get subscription details from Stripe
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId)

          await db
            .update(subscriptions)
            .set({
              stripeSubscriptionId: subscriptionId,
              stripePriceId: stripeSubscription.items.data[0].price.id,
              stripeProductId: stripeSubscription.items.data[0].price.product as string,
              status: 'active',
              currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
              currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.stripeCustomerId, customerId))
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await db
          .update(subscriptions)
          .set({
            status: subscription.status as any,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.stripeCustomerId, customerId))
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await db
          .update(subscriptions)
          .set({
            status: 'canceled',
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.stripeCustomerId, customerId))
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        await db
          .update(subscriptions)
          .set({
            status: 'past_due',
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.stripeCustomerId, customerId))
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
