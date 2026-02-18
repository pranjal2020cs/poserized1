'use client'

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  category: string
  description?: string
}

export function ProductCard({ title, price, image, category, description }: ProductCardProps) {
  return (
    <div className="group flex flex-col h-full">
      {/* Image Container - Square aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-background border border-border/50 rounded-sm transition-all duration-300 group-hover:border-accent/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category badge - bottom left */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm border border-border text-xs font-bold text-accent uppercase tracking-wider rounded-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content - Below image */}
      <div className="flex-1 flex flex-col pt-5 pb-3">
        {/* Title */}
        <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors duration-300 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description - Optional */}
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="text-sm md:text-base font-bold text-foreground">
          <span>From Rs. {price}</span>
        </div>
      </div>
    </div>
  )
}
