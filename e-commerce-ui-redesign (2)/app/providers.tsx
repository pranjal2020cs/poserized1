'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return safe defaults during SSR/SSG before provider mounts
    return {
      theme: 'system' as const,
      resolvedTheme: 'light' as const,
      setTheme: () => {},
    }
  }
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Determine the actual theme to apply
  const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      }
      return 'light'
    }
    return currentTheme
  }

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initialTheme = stored || 'system'
    setThemeState(initialTheme)
    setResolvedTheme(getResolvedTheme(initialTheme))
    setMounted(true)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (initialTheme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    html.setAttribute('data-theme', resolvedTheme)

    // Also set the class for fallback CSS
    html.classList.remove('light', 'dark')
    html.classList.add(resolvedTheme)
  }, [resolvedTheme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    setResolvedTheme(getResolvedTheme(newTheme))
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
