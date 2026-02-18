'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  description: string
  image?: string
  category: string
  price?: number
  rating?: number
}

interface ContentGridProps {
  items: ContentItem[]
  title?: string
  description?: string
  showPricing?: boolean
}

export function ContentGrid({
  items,
  title = 'Featured Content',
  description,
  showPricing = false,
}: ContentGridProps) {
  return (
    <section className="section bg-slate-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{title}</h2>
          {description && <p className="text-lg text-slate-600 text-pretty">{description}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <article key={item.id} className="card-hover group overflow-hidden">
              {/* Image Container */}
              {item.image && (
                <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="badge-primary text-xs">{item.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2">
                  {item.description}
                </p>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(item.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }
                        />
                      ))}
                    </div>
                  )}

                  {showPricing && item.price && (
                    <span className="font-bold text-slate-900">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Action */}
                <Link
                  href={`/products/${item.id}`}
                  className="btn-primary w-full text-center text-sm"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No content available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
