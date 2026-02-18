'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-secondary/30 mt-24 md:mt-32">
      <div className="container-max py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                BP
              </div>
              <span className="font-bold text-lg text-foreground">Blog</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A production-ready Next.js blog platform with modern design and accessibility in mind.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 hover:bg-primary hover:text-white hover:shadow-lg rounded-lg transition-all duration-300 bg-secondary/50 text-muted-foreground"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-foreground text-lg">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium group"
                >
                  <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-foreground text-lg">Resources</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium group"
              >
                <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                  Privacy Policy
                </span>
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium group"
              >
                <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                  Terms of Service
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium group"
              >
                <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                  Contact Us
                </span>
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-foreground text-lg">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all duration-300"
              />
              <button
                type="submit"
                className="btn btn-accent text-sm font-medium w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Bottom */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p className="font-medium">
            &copy; {currentYear} Blog Platform. All rights reserved.
          </p>
          <div className="flex gap-8 md:gap-12">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-300 font-medium">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-300 font-medium">
              Terms
            </Link>
            <a href="mailto:hello@example.com" className="hover:text-primary transition-colors duration-300 font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
