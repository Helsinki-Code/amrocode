'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Crown, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const features = [
  'Unlimited AI coding tasks',
  'Access to all 5+ premium AI models',
  'Claude Sonnet 4.5, GPT-4 Turbo, Codex',
  'Gemini Pro, Cursor AI & more',
  'Priority processing & support',
  'Advanced sandbox environments',
  'GitHub integration & auto-commits',
  'MCP server connectivity',
  'Custom API keys support',
  'Team collaboration tools',
  'Advanced analytics dashboard',
  'Cancel anytime',
]

export function PremiumPricing() {
  const [isHovered, setIsHovered] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/auth/info')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.user)
      })
      .catch(() => setIsAuthenticated(false))
  }, [])

  const handleSubscribe = async () => {
    setIsLoading(true)

    try {
      // Check authentication first
      const authResponse = await fetch('/api/auth/info')
      const authData = await authResponse.json()

      console.log('Auth check:', authData)

      if (!authData.user) {
        // Not authenticated - redirect to GitHub OAuth IMMEDIATELY
        console.log('Not authenticated, redirecting to GitHub OAuth...')
        window.location.href = '/api/auth/github/signin'
        return
      }

      // Authenticated - proceed to checkout
      console.log('User authenticated, creating checkout session...')
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok && data.url) {
        console.log('Redirecting to Stripe checkout...')
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data)
        toast.error(data.error || 'Failed to create checkout session')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error in handleSubscribe:', error)
      toast.error('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,170,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,220,255,0.1),transparent_50%)]" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl"
          >
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Membership</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold"
          >
            One Plan.
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Unlimited Everything.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join the elite developers building the future
          </motion.p>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] rounded-3xl blur-2xl transition-all duration-500 ${isHovered ? 'opacity-75 animate-gradient' : 'opacity-50'}`} />

            {/* Card */}
            <div className="relative bg-black/90 backdrop-blur-2xl rounded-3xl border border-primary/30 overflow-hidden">
              {/* Premium badge */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary">MOST POPULAR</span>
                </div>
              </div>

              <div className="p-12">
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-6xl md:text-7xl font-bold text-white">£499</span>
                    <span className="text-2xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Everything you need to build at superhuman speed
                  </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                      </div>
                      <span className="text-sm text-white/90 group-hover/item:text-white transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  size="lg"
                  className="w-full text-lg py-7 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all group shadow-2xl shadow-primary/50 hover:shadow-primary/70 hover:scale-[1.02] text-primary-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      {isAuthenticated ? 'Subscribe Now' : 'Sign In to Subscribe'}
                      <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Secure payment via Stripe • Cancel anytime
                </p>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Priority support</span>
            </div>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by developers worldwide</p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">+1,000 developers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
