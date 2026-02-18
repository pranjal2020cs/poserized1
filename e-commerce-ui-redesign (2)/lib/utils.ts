import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines classnames using clsx and tailwind-merge
 * This allows for conditional Tailwind classes and proper merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a date to a readable format (e.g., "January 1, 2024")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Converts a date to ISO format (e.g., "2024-01-01")
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toISOString().split('T')[0]
}

/**
 * Estimates reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

/**
 * Slugifies a string for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}
