'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,170,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,220,255,0.1),transparent_50%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Code Generation</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              AmroCode
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-3xl leading-relaxed">
            The ultimate AI coding platform. Build, deploy, and ship faster with{' '}
            <span className="text-primary font-semibold">Claude</span>,{' '}
            <span className="text-primary font-semibold">GPT-4</span>,{' '}
            <span className="text-primary font-semibold">Codex</span>, and more
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground/80 max-w-2xl">
            Unlimited access to the world's most advanced AI coding agents. Transform your ideas into production-ready
            code in minutes, not days.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group">
              <Link href="#pricing">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/20 group">
              <Link href="#features">
                <Code2 className="mr-2 h-5 w-5" />
                See Features
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 w-full max-w-2xl">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Tasks</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating code snippets animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-lg backdrop-blur-sm animate-float" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-secondary/10 rounded-lg backdrop-blur-sm animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-lg backdrop-blur-sm animate-float-slow" />
      </div>
    </section>
  )
}
