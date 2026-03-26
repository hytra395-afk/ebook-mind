import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert Google Drive share URL to image URL (for ebook covers)
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000 (NEW - no Vercel quota)
 *     OR: https://drive.google.com/uc?export=view&id=FILE_ID (OLD - already converted, keep as is)
 * 
 * Strategy:
 * - If URL is already converted to uc?export=view → Keep it (old ebooks)
 * - If URL is raw Drive link → Convert to thumbnail API (new ebooks, no quota)
 */
export function convertDriveUrl(url: string): string {
  if (!url) return url

  // If already converted to uc?export=view, keep it (old ebooks)
  if (url.includes('uc?export=view') || url.includes('uc?id=')) {
    return url
  }

  // If already converted to thumbnail API, keep it (new ebooks)
  if (url.includes('thumbnail?id=')) {
    return url
  }

  // Handle: https://drive.google.com/file/d/FILE_ID/view?...
  // Convert to thumbnail API (new ebooks - no Vercel quota)
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`
  }

  // Handle: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1000`
  }

  return url
}

/**
 * Convert Google Drive share URL to thumbnail API for blog images
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200
 * Note: This works with unoptimized=true and doesn't consume Vercel quota
 */
export function convertBlogImageUrl(url: string): string {
  if (!url) return url

  // Handle: https://drive.google.com/file/d/FILE_ID/view?...
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`
  }

  // Handle: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1200`
  }

  // If not Google Drive URL, return as is (e.g., Unsplash URLs)
  return url
}
