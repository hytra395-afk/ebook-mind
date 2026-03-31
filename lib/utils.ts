import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert Google Drive share URL to thumbnail API (for ebook covers)
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
 * Note: Works with unoptimized=true, doesn't consume Vercel quota
 */
export function convertDriveUrl(url: string): string {
  if (!url) return url

  // If already converted to thumbnail API, keep it
  if (url.includes('thumbnail?id=')) {
    return url
  }

  // Handle: https://drive.google.com/file/d/FILE_ID/view?...
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`
  }

  // Handle: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1000`
  }

  // Handle old uc?export=view format (convert to thumbnail API)
  const ucMatch = url.match(/uc\?(?:export=view&)?id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) {
    return `https://drive.google.com/thumbnail?id=${ucMatch[1]}&sz=w1000`
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

/**
 * Convert Google Drive URL to proxied URL for OG images (to bypass robots.txt)
 * This is specifically for Open Graph images that need to be crawled by Googlebot
 */
export function convertDriveUrlForOG(url: string): string {
  if (!url) return url

  // If it's a Google Drive URL, proxy it through our API
  if (url.includes('drive.google.com')) {
    const driveUrl = convertDriveUrl(url)
    return `https://ebookmind.com/api/image-proxy?url=${encodeURIComponent(driveUrl)}`
  }

  return url
}

/**
 * Convert blog image URL to proxied URL for OG images
 */
export function convertBlogImageUrlForOG(url: string): string {
  if (!url) return url

  // If it's a Google Drive URL, proxy it through our API
  if (url.includes('drive.google.com')) {
    const driveUrl = convertBlogImageUrl(url)
    return `https://ebookmind.com/api/image-proxy?url=${encodeURIComponent(driveUrl)}`
  }

  return url
}
