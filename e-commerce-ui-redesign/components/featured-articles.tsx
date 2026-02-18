import Link from 'next/link'
import { articles } from '@/data/articles'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Clock, Tag } from 'lucide-react'

export function FeaturedArticles() {
  const featured = articles.filter(article => article.featured).slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featured.map((article, index) => (
        <article
          key={article.id}
          className="group flex flex-col h-full card-premium p-8 hover:shadow-premium"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Category Badge */}
          <div className="mb-5 flex items-center gap-2">
            <span className="badge badge-primary">
              <Tag className="w-3.5 h-3.5" />
              {article.category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${article.slug}`} className="mb-4 group/title">
            <h3 className="text-xl md:text-2xl font-bold group-hover/title:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base mb-6 flex-1 line-clamp-3 leading-relaxed">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} min</span>
            </div>
            <time dateTime={article.date} className="flex items-center">
              {formatDate(article.date)}
            </time>
          </div>

          {/* Author and Link */}
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-muted-foreground font-medium">By {article.author}</span>
            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-all duration-300 group/link"
            >
              Read
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
