import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/data/articles'
import { formatDate } from '@/lib/utils'
import { Clock, Tag } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles on web development, design, and technology.',
  openGraph: {
    title: 'Blog | Modern Blog Platform',
    description: 'Read our latest articles on web development, design, and technology.',
  },
}

export default function BlogPage() {
  // Sort articles by date, newest first
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div>
      <PageHero
        title="Blog Articles"
        subtitle="Read Our Latest Stories"
        description="Explore our collection of articles on web development, design patterns, and technology trends. Learn from industry experts and stay updated with the latest insights."
        imageUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=800&fit=crop"
      />

      {/* Articles Grid */}
      <section className="py-12 md:py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col p-6 bg-background border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                {/* Category Badge */}
                <div className="mb-4 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${article.slug}`} className="mb-3">
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                  {article.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readingTime} min</span>
                  </div>
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                </div>

                {/* Author and Link */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">By {article.author}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-primary font-medium text-sm hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {sortedArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
