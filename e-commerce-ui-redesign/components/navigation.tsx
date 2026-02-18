'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/app/providers'
import { Menu, X, Moon, Sun } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-soft transition-all duration-300">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-0">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-xl md:text-2xl hover:text-primary transition-all duration-300 group"
            aria-label="Blog Platform Home"
          >
            <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm md:text-base group-hover:shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
              BP
            </div>
            <span className="hidden sm:inline text-foreground">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 font-medium text-sm transition-all duration-300 relative group rounded-lg ${
                    active
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } origin-left`} />
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent/10 text-foreground hover:text-accent rounded-lg transition-all duration-300 hover:shadow-sm"
              aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {resolvedTheme === 'light' ? (
                <Moon className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Sun className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden hover:bg-secondary rounded-lg transition-all duration-300"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 animate-slideDown">
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-between ${
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.label}
                    {active && <span className="w-2 h-2 bg-primary rounded-full" />}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </nav>
  )
}
