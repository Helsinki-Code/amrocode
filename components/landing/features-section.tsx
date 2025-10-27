'use client'

import { Bot, Code, Zap, Shield, Layers, Puzzle } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Multiple AI Models',
    description: 'Access Claude, GPT-4, Codex, Gemini, Cursor, and more. Choose the best model for your task.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate production-ready code in seconds with our optimized AI infrastructure and sandboxes.',
  },
  {
    icon: Code,
    title: 'Full Code Control',
    description: 'Direct GitHub integration, automatic branching, commits, and pull requests. Your code, your way.',
  },
  {
    icon: Shield,
    title: 'Secure Sandboxes',
    description: 'Isolated Vercel Sandbox environments keep your code safe and secure during execution.',
  },
  {
    icon: Layers,
    title: 'MCP Integration',
    description: 'Connect MCP servers to extend capabilities with custom tools and integrations.',
  },
  {
    icon: Puzzle,
    title: 'Unlimited Tasks',
    description: 'No limits on tasks, projects, or complexity. Build as much as you want, whenever you want.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              build faster
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade AI coding tools designed for developers who want to ship products at lightning speed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
