'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const beforeCode = `// Hours of manual coding...
function fetchData() {
  // TODO: Add error handling
  // TODO: Add loading states
  // TODO: Add caching
  // TODO: Add retry logic
  return fetch('/api/data')
}
`

const afterCode = `// AI-generated in 3 seconds
async function fetchData() {
  const cache = new Map();

  try {
    if (cache.has('data')) {
      return cache.get('data');
    }

    const response = await fetch('/api/data', {
      retry: 3,
      timeout: 5000
    });

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();
    cache.set('data', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}`

export function CodeTransformation() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate progress
          let current = 0
          const interval = setInterval(() => {
            current += 2
            setProgress(current)
            if (current >= 100) clearInterval(interval)
          }, 30)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            Watch Your Code{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From rough ideas to production-ready code. See the magic happen in real-time.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Transformation Container */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-red-500 via-primary to-secondary hidden lg:block">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Arrow indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <div className="bg-background border-2 border-primary rounded-full p-3 shadow-lg shadow-primary/50 animate-pulse">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Before */}
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <span className="text-2xl">😓</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-500">Before</h3>
                      <p className="text-sm text-muted-foreground">Manual coding, endless debugging</p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-red-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition" />
                    <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-red-500/20">
                      <div className="flex items-center gap-2 px-4 py-3 bg-red-500/5 border-b border-red-500/10">
                        <div className="text-xs text-red-400 font-mono">manual-code.js</div>
                      </div>
                      <pre className="p-6 text-sm font-mono text-red-300/80 overflow-x-auto">
                        <code>{beforeCode}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">Hours wasted</span>
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">Incomplete</span>
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">Bug-prone</span>
                  </div>
                </div>
              </div>

              {/* After */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">After</h3>
                      <p className="text-sm text-muted-foreground">AI-powered, production-ready</p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition" />
                    <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-primary/30">
                      <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border-b border-primary/10">
                        <div className="text-xs text-primary font-mono">ai-generated.js</div>
                        <div className="ml-auto text-xs text-primary">✓ Complete</div>
                      </div>
                      <pre className="p-6 text-sm font-mono text-primary/80 overflow-x-auto">
                        <code>{afterCode}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />3 seconds
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Error handling
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Optimized
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Production-ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                100x
              </div>
              <div className="text-sm text-muted-foreground">Faster Development</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm text-muted-foreground">Fewer Bugs</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  )
}
