import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { ProductGrid } from '@/components/ProductGrid'
import { FeaturedArticles } from '@/components/featured-articles'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Premium Ecommerce Platform',
  description: 'Discover curated premium products with futuristic design. Fast shipping, secure payment, and easy returns.',
  openGraph: {
    title: 'Premium Ecommerce Platform',
    description: 'Discover curated premium products with futuristic design. Fast shipping, secure payment, and easy returns.',
  },
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Product Grid Section */}
      <ProductGrid products={products} />

      {/* Featured Articles Section */}
      <section className="section-lg relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />
        <div className="container-max relative z-10">
          <div className="mb-16 md:mb-20 animate-slideUp">
            <div className="inline-block mb-4">
              <div className="glass px-4 py-2 rounded-full text-sm font-bold text-accent uppercase tracking-wider">
                Insights & Stories
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-balance leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
              Stay updated with industry insights, product reviews, and tech trends from our expert writers.
            </p>
          </div>
          <FeaturedArticles />
          <div className="text-center mt-16 md:mt-20">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-accent font-bold text-lg hover:text-cyan-400 transition-colors duration-300"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-lg relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />
        <div className="container-max text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-slideUp">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="glass px-4 py-2 rounded-full text-sm font-bold text-accent uppercase tracking-wider">
                  Join Us Today
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-balance leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Ready to Shop?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-foreground/70">
                Experience premium shopping with fast delivery, secure payments, and hassle-free returns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="#products"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Browse Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="glass-hover px-8 py-4 font-bold rounded-lg w-full sm:w-auto inline-flex items-center justify-center gap-2 text-foreground"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
