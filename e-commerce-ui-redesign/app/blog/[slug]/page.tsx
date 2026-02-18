import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles } from '@/data/articles'
import { formatDate } from '@/lib/utils'
import { Clock, Tag, ArrowLeft } from 'lucide-react'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(
  { params }: ArticlePageProps
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export async function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Get related articles (same category, different article)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  return (
    <div>
      {/* Article Header */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container-max max-w-2xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} min read</span>
            </div>
            <span className="hidden md:inline">•</span>
            <time dateTime={article.date}>
              {formatDate(article.date)}
            </time>
            <span className="hidden md:inline">•</span>
            <span>By {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-20">
        <div className="container-max max-w-2xl">
          <article className="prose prose-invert max-w-none">
            <div
              className="text-foreground leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split('\n')
                  .map(line => {
                    // Convert markdown-like syntax to HTML
                    if (line.startsWith('# ')) {
                      return `<h2 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h2>`
                    }
                    if (line.startsWith('## ')) {
                      return `<h3 class="text-2xl font-bold mt-6 mb-3">${line.slice(3)}</h3>`
                    }
                    if (line.startsWith('### ')) {
                      return `<h4 class="text-xl font-bold mt-4 mb-2">${line.slice(4)}</h4>`
                    }
                    if (line.startsWith('- ')) {
                      return `<li class="ml-6 mb-2">${line.slice(2)}</li>`
                    }
                    if (line.startsWith('```')) {
                      return '<pre class="bg-secondary p-4 rounded-lg overflow-x-auto mb-4"><code class="font-mono text-sm">'
                    }
                    if (line === '```') {
                      return '</code></pre>'
                    }
                    if (line.trim()) {
                      return `<p class="mb-4">${line}</p>`
                    }
                    return ''
                  })
                  .join('')
              }}
            />
          </article>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary border-t border-border">
          <div className="container-max">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <article
                  key={relatedArticle.id}
                  className="group flex flex-col p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${relatedArticle.slug}`}>
                      {relatedArticle.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                    {relatedArticle.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={relatedArticle.date}>
                      {formatDate(relatedArticle.date)}
                    </time>
                    <Link
                      href={`/blog/${relatedArticle.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">More Articles</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out our blog for more insightful articles and tutorials.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            View All Articles
          </Link>
        </div>
      </section>
    </div>
  )
}
