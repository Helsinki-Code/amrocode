'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Terminal, Sparkles } from 'lucide-react'
import Link from 'next/link'

const codeSteps = [
  { line: '$ amrocode create --prompt "Build a todo app"', delay: 0 },
  { line: '> Analyzing requirements...', delay: 1000 },
  { line: '> Generating React components...', delay: 2000 },
  { line: '> Creating API routes...', delay: 3000 },
  { line: '> Setting up database schema...', delay: 4000 },
  { line: '> Writing tests...', delay: 5000 },
  { line: '✓ Complete! Your app is ready.', delay: 6000, highlight: true },
]

export function ImmersiveHero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    codeSteps.forEach((step, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index])
      }, step.delay)
    })

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating orbs with neon glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse delay-1000" />

      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Next-Generation AI Coding Platform
              </span>
            </div>

            {/* Main heading with gradient animation */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block mb-2 text-foreground">Code at the</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Speed of Thought
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Transform ideas into production-ready code instantly. AmroCode harnesses{' '}
              <span className="text-primary font-semibold">Claude</span>,{' '}
              <span className="text-primary font-semibold">GPT-4</span>, and{' '}
              <span className="text-primary font-semibold">5+ AI models</span> to build, test, and deploy your
              applications automatically.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity group shadow-lg shadow-primary/25 text-primary-foreground font-semibold"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => {
                  const featuresSection = document.getElementById('features')
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 backdrop-blur-xl transition-all"
              >
                <Terminal className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>

          {/* Right: Animated Terminal */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />

            {/* Terminal Window */}
            <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-white/60 ml-2">amrocode-terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[400px]">
                {codeSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      visibleLines.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span
                      className={`${
                        step.highlight
                          ? 'text-primary font-bold'
                          : step.line.startsWith('$')
                            ? 'text-secondary'
                            : 'text-white/80'
                      }`}
                    >
                      {step.line}
                    </span>
                    {index === visibleLines.length - 1 && !step.highlight && (
                      <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▊</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating badges */}
            <div className="absolute -right-4 top-1/4 bg-background/80 backdrop-blur-xl border border-primary/20 rounded-lg px-4 py-2 shadow-lg animate-float">
              <div className="text-xs text-muted-foreground">Response Time</div>
              <div className="text-2xl font-bold text-primary">2.3s</div>
            </div>

            <div className="absolute -left-4 bottom-1/4 bg-background/80 backdrop-blur-xl border border-primary/20 rounded-lg px-4 py-2 shadow-lg animate-float-delayed">
              <div className="text-xs text-muted-foreground">Success Rate</div>
              <div className="text-2xl font-bold text-primary">99.8%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
