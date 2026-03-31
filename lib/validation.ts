/**
 * Input validation and sanitization utilities
 */

import { z } from 'zod'

// Email validation
export const emailSchema = z.string().email().max(255)

// Order creation validation
export const createOrderSchema = z.object({
  items: z.array(z.object({
    type: z.enum(['ebook', 'combo']),
    id: z.string().uuid(),
    quantity: z.number().int().min(1).max(10),
  })).min(1).max(20),
  email: emailSchema.optional(),
})

// Download token validation
export const downloadTokenSchema = z.string().min(20).max(100).regex(/^[a-zA-Z0-9_-]+$/)

// Admin ebook creation validation
export const createEbookSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(5000),
  price: z.number().min(0).max(10000000),
  pages: z.number().int().min(1).max(10000),
  cover_url: z.string().url().max(1000),
  external_url: z.string().url().max(1000).optional(),
  category_id: z.string().uuid(),
  level_id: z.string().uuid(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  bestseller: z.boolean().optional(),
})

// Sanitize HTML content (basic XSS prevention)
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
}

// Sanitize string input
export function sanitizeString(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove angle brackets
}

// Validate UUID
export function isValidUuid(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Validate slug format
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9-]+$/
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 200
}

// Validate email
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

// Validate and sanitize order items
export function validateOrderItems(items: any[]): boolean {
  try {
    createOrderSchema.parse({ items })
    return true
  } catch {
    return false
  }
}
