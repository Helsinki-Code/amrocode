'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggleAnimated() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-muted animate-pulse" />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-16 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
      aria-label="Toggle theme"
    >
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-card to-card/50" />

      {/* Slider */}
      <motion.div
        className="absolute top-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg"
        animate={{
          x: isDark ? 30 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Particles effect */}
      <AnimatePresence>
        {mounted && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: isDark ? [2, 10 + i * 5, 20] : [30, 20 - i * 5, 10],
                  y: [-5 + i * 2, -10 - i * 3, -15],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: 0,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </button>
  )
}
