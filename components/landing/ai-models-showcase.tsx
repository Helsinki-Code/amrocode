'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const models = [
  {
    name: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    color: 'from-[#D97757] to-[#B85C3F]',
    icon: '🧠',
    specialty: 'Complex reasoning & code architecture',
    speed: '⚡ Ultra Fast',
  },
  {
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    color: 'from-[#10A37F] to-[#0D8C6B]',
    icon: '🤖',
    specialty: 'General purpose & creative solutions',
    speed: '⚡⚡ Lightning',
  },
  {
    name: 'Codex',
    provider: 'OpenAI',
    color: 'from-[#00FFAA] to-[#00DCB4]',
    icon: '💻',
    specialty: 'Code completion & optimization',
    speed: '⚡⚡⚡ Instant',
  },
  {
    name: 'Gemini Pro',
    provider: 'Google',
    color: 'from-[#4285F4] to-[#34A853]',
    icon: '✨',
    specialty: 'Multi-modal understanding',
    speed: '⚡⚡ Fast',
  },
  {
    name: 'Cursor AI',
    provider: 'Anysphere',
    color: 'from-[#8B5CF6] to-[#7C3AED]',
    icon: '🎯',
    specialty: 'Context-aware coding',
    speed: '⚡⚡ Quick',
  },
]

export function AIModelsShowcase() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [hoveredModel, setHoveredModel] = useState<number | null>(null)

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,170,0.05),transparent_70%)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">
            Powered by{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              5+ AI Models
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect AI for your task. Or let AmroCode pick the best one automatically.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Model Cards Grid */}
          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {models.map((model, index) => (
              <button
                key={index}
                onClick={() => setSelectedModel(index)}
                onMouseEnter={() => setHoveredModel(index)}
                onMouseLeave={() => setHoveredModel(null)}
                className={`relative p-6 rounded-2xl transition-all duration-300 ${
                  selectedModel === index
                    ? 'bg-gradient-to-br ' + model.color + ' text-white scale-105 shadow-2xl'
                    : 'bg-background/50 backdrop-blur-xl border border-border hover:border-primary/50'
                }`}
              >
                {/* Glow effect */}
                {selectedModel === index && (
                  <div className={`absolute -inset-1 bg-gradient-to-r ${model.color} rounded-2xl blur-xl opacity-50`} />
                )}

                <div className="relative space-y-3">
                  <div className="text-4xl">{model.icon}</div>
                  <div className={`text-sm font-semibold ${selectedModel === index ? 'text-white' : 'text-foreground'}`}>
                    {model.name}
                  </div>
                  <div
                    className={`text-xs ${selectedModel === index ? 'text-white/80' : 'text-muted-foreground'}`}
                  >
                    {model.provider}
                  </div>
                </div>

                {/* Selection indicator */}
                {selectedModel === index && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Model Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className={`absolute -inset-4 bg-gradient-to-r ${models[selectedModel].color} rounded-3xl blur-3xl opacity-20`} />

              <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl p-12 border border-border">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left: Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{models[selectedModel].icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold">{models[selectedModel].name}</h3>
                        <p className="text-muted-foreground">{models[selectedModel].provider}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${models[selectedModel].color}`} />
                        <div>
                          <div className="text-sm font-semibold text-muted-foreground">Specialty</div>
                          <div className="text-lg">{models[selectedModel].specialty}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${models[selectedModel].color}`} />
                        <div>
                          <div className="text-sm font-semibold text-muted-foreground">Speed</div>
                          <div className="text-lg">{models[selectedModel].speed}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Visual Demo */}
                  <div className="relative">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${models[selectedModel].color} rounded-2xl blur-xl opacity-30 animate-pulse`} />
                    <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-white/60">Active Model</span>
                      </div>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="text-secondary">$ Initialize {models[selectedModel].name}</div>
                        <div className="text-white/60">→ Loading model parameters...</div>
                        <div className="text-white/60">→ Optimizing inference...</div>
                        <div className="text-primary font-bold">✓ Ready to code!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Feature highlight */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Automatic model selection based on your task complexity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
