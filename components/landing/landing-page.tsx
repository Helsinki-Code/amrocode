'use client'

import { ImmersiveHero } from './immersive-hero'
import { CodeTransformation } from './code-transformation'
import { AIModelsShowcase } from './ai-models-showcase'
import { PremiumPricing } from './premium-pricing'
import { Button } from '@/components/ui/button'
import { ThemeToggleAnimated } from '@/components/theme-toggle-animated'
import Link from 'next/link'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AmroCode
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => {
                  const section = document.getElementById('features')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm hover:text-primary transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('models')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm hover:text-primary transition-colors"
              >
                AI Models
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('pricing')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm hover:text-primary transition-colors"
              >
                Pricing
              </button>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <ThemeToggleAnimated />
              <Button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <ImmersiveHero />

        <div id="features">
          <CodeTransformation />
        </div>

        <div id="models">
          <AIModelsShowcase />
        </div>

        <PremiumPricing />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AmroCode
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">The ultimate AI coding platform for modern developers.</p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="#features" className="hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="#models" className="hover:text-primary transition-colors">
                  AI Models
                </Link>
                <Link href="#pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">© 2024 AmroCode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
