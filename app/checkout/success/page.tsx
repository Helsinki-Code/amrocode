import { Suspense } from 'react'
import { CheckoutSuccessContent } from './success-content'

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
