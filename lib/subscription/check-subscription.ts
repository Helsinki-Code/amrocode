import { db } from '@/lib/db'
import { subscriptions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function checkUserSubscription(userId: string): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1)

    const subscription = result[0]

    if (!subscription) {
      return false
    }

    // Check if subscription is active or trialing
    const isActive = subscription.status === 'active' || subscription.status === 'trialing'

    // Check if subscription period is still valid
    if (isActive && subscription.currentPeriodEnd) {
      const now = new Date()
      const periodEnd = new Date(subscription.currentPeriodEnd)
      return periodEnd > now
    }

    return isActive
  } catch (error) {
    console.error('Error checking subscription:', error)
    return false
  }
}

export async function getUserSubscription(userId: string) {
  try {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1)

    return result[0]
  } catch (error) {
    console.error('Error getting subscription:', error)
    return null
  }
}
