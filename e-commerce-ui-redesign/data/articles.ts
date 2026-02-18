export interface Article {
  id: string
  slug: string
  title: string
  description: string
  content: string
  author: string
  date: string
  category: string
  readingTime: number
  tags: string[]
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'building-performant-next-js-apps',
    title: 'Building Performant Next.js Applications',
    description: 'Learn the best practices for optimizing your Next.js applications for maximum performance and user experience.',
    author: 'Sarah Chen',
    date: '2024-01-15',
    category: 'Web Development',
    readingTime: 8,
    tags: ['next.js', 'performance', 'optimization'],
    featured: true,
    content: `
# Building Performant Next.js Applications

Performance is crucial for modern web applications. In this comprehensive guide, we'll explore various techniques to optimize your Next.js applications.

## Why Performance Matters

Performance directly impacts user satisfaction and SEO rankings. Studies show that every 100ms increase in load time can reduce conversions by up to 1%.

## Key Performance Metrics

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: Should be under 2.5 seconds
- **First Input Delay (FID)**: Should be under 100ms
- **Cumulative Layout Shift (CLS)**: Should be under 0.1

## Optimization Techniques

### 1. Image Optimization
Next.js provides built-in image optimization through the Image component. Always use it for maximum performance.

\`\`\`tsx
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
    />
  )
}
\`\`\`

### 2. Code Splitting and Lazy Loading
Automatically split your code into smaller chunks with dynamic imports.

### 3. CSS Optimization
Use Tailwind CSS and purge unused styles for minimal CSS bundles.

### 4. Database Query Optimization
Always use pagination and limit the number of items fetched.

## Monitoring Performance

Use tools like Lighthouse, PageSpeed Insights, and Web Vitals to monitor your application's performance continuously.

## Conclusion

By implementing these optimization techniques, you can create fast, efficient Next.js applications that provide excellent user experiences.
    `,
  },
  {
    id: '2',
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques in 2024',
    description: 'Explore the latest CSS features and techniques that can revolutionize your styling approach.',
    author: 'Marcus Johnson',
    date: '2024-01-10',
    category: 'Frontend',
    readingTime: 6,
    tags: ['css', 'styling', 'web-design'],
    featured: true,
    content: `
# Modern CSS Techniques in 2024

CSS has evolved significantly. Let's explore the cutting-edge techniques available today.

## CSS Grid and Flexbox

Modern layout is built on these two powerful systems. Understanding both is essential for contemporary web development.

## Custom Properties (CSS Variables)

CSS variables enable dynamic styling and theme switching without JavaScript.

\`\`\`css
:root {
  --primary-color: #007bff;
  --spacing-unit: 0.5rem;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}
\`\`\`

## Container Queries

Container queries allow responsive design based on container size rather than viewport size.

## Conclusion

These modern CSS techniques enable more flexible, maintainable, and responsive designs.
    `,
  },
  {
    id: '3',
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive',
    description: 'Master React Hooks and understand how to use them effectively in your applications.',
    author: 'Emily Rodriguez',
    date: '2024-01-05',
    category: 'React',
    readingTime: 10,
    tags: ['react', 'hooks', 'javascript'],
    featured: true,
    content: `
# React Hooks Deep Dive

React Hooks revolutionized how we write functional components. Let's explore them in depth.

## Built-in Hooks

### useState
State management in functional components.

### useEffect
Side effects and cleanup operations.

### useContext
Access context values without prop drilling.

## Custom Hooks

Create reusable logic with custom hooks.

## Best Practices

1. Follow the Rules of Hooks
2. Use ESLint plugin to catch errors
3. Keep hooks focused and single-responsibility

## Conclusion

Mastering hooks is essential for modern React development.
    `,
  },
  {
    id: '4',
    slug: 'tailwind-css-workflow',
    title: 'Optimizing Your Tailwind CSS Workflow',
    description: 'Tips and tricks for working more efficiently with Tailwind CSS in your projects.',
    author: 'David Kim',
    date: '2023-12-28',
    category: 'Web Development',
    readingTime: 7,
    tags: ['tailwind', 'css', 'productivity'],
    content: `
# Optimizing Your Tailwind CSS Workflow

Tailwind CSS can significantly speed up your development process when used correctly.

## Configuration Customization

Extend Tailwind's default theme to match your design system.

## Component Extraction

Create reusable components to reduce repetition.

## Performance Considerations

Use PurgeCSS to remove unused styles in production.

## Conclusion

With the right workflow, Tailwind CSS becomes a powerful tool for rapid development.
    `,
  },
  {
    id: '5',
    slug: 'database-optimization-strategies',
    title: 'Database Optimization Strategies',
    description: 'Learn how to optimize your database queries and improve application performance.',
    author: 'Jessica Lee',
    date: '2023-12-20',
    category: 'Backend',
    readingTime: 9,
    tags: ['database', 'sql', 'performance'],
    content: `
# Database Optimization Strategies

Database performance is critical for application scalability.

## Indexing

Proper indexing can dramatically improve query performance.

## Query Optimization

Use EXPLAIN to analyze query execution plans.

## Caching Strategies

Implement caching layers to reduce database load.

## Conclusion

These strategies will help you build scalable applications.
    `,
  },
  {
    id: '6',
    slug: 'web-accessibility-guide',
    title: 'Complete Web Accessibility Guide',
    description: 'Comprehensive guide to building accessible web applications for everyone.',
    author: 'Thomas Anderson',
    date: '2023-12-15',
    category: 'Web Development',
    readingTime: 12,
    tags: ['accessibility', 'wcag', 'inclusive-design'],
    content: `
# Complete Web Accessibility Guide

Building accessible websites benefits everyone and is a legal requirement in many jurisdictions.

## WCAG Standards

Follow Web Content Accessibility Guidelines (WCAG) 2.1 at level AA minimum.

## Semantic HTML

Use semantic HTML elements for better structure and accessibility.

## ARIA Attributes

Use ARIA attributes to provide additional context to assistive technologies.

## Testing

Use automated tools and manual testing to verify accessibility.

## Conclusion

Accessibility is not optional—it's essential for modern web development.
    `,
  },
]
