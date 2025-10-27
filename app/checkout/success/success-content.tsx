'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Give Stripe webhook time to process
      setTimeout(() => {
        setIsVerifying(false)
      }, 3000)
    }
  }, [sessionId])

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
          <p className="text-lg text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,170,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,220,255,0.1),transparent_70%)]" />

      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.25,
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to AmroCode!
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your payment was successful. Let's start building something amazing.
            </p>
          </motion.div>

          {/* Features unlocked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-border space-y-4"
          >
            <div className="flex items-center gap-2 justify-center text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">You now have access to:</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                'Unlimited AI coding tasks',
                'All 5+ premium AI models',
                'Priority processing',
                'Advanced sandboxes',
                'GitHub integration',
                'Priority support',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 group text-primary-foreground font-semibold shadow-lg shadow-primary/25">
              <Link href="/app">
                Start Coding Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-sm text-muted-foreground"
          >
            Need help getting started?{' '}
            <Link href="/support" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
