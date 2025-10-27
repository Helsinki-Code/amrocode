import { getServerSession } from '@/lib/session/get-server-session'
import { checkUserSubscription } from '@/lib/subscription/check-subscription'
import { redirect } from 'next/navigation'
import { LandingPage } from '@/components/landing/landing-page'

export default async function Home() {
  const session = await getServerSession()

  // If user is logged in and has a subscription, redirect to app
  if (session?.user) {
    const hasSubscription = await checkUserSubscription(session.user.userId)
    if (hasSubscription) {
      redirect('/app')
    }
  }

  // Show landing page for non-subscribers or logged-out users
  return <LandingPage />
}
