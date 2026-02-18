'use client'

import { ProductCard } from './ProductCard'

interface Product {
  id: string
  title: string
  price: number
  image: string
  category: string
  description?: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="products" className="relative section-lg bg-background border-t border-border/50">
      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-16 text-center animate-slideUp">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 text-xs font-bold text-accent uppercase tracking-wider border border-border/50 rounded-sm">
              Featured Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-balance text-foreground mb-4 leading-tight">
            Curated Products
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products from the best sellers around the world.
          </p>
        </div>

        {/* Grid - Responsive columns with minimal gap */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{
                animation: `slideUp 0.6s ease-out ${0.05 * index}s both`,
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button className="group px-8 py-3 bg-foreground text-background font-bold text-base transition-all duration-300 hover:opacity-80 active:scale-95 inline-block">
            View All Products
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
