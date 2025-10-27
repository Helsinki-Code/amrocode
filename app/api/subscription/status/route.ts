import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/session/get-server-session'
import { getUserSubscription } from '@/lib/subscription/check-subscription'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await getUserSubscription(session.user.userId)

    if (!subscription) {
      return NextResponse.json({ hasSubscription: false, subscription: null })
    }

    return NextResponse.json({
      hasSubscription: subscription.status === 'active' || subscription.status === 'trialing',
      subscription: {
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    })
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription status' }, { status: 500 })
  }
}
