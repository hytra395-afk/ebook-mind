import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert Google Drive share URL to direct image URL
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000 (Works with public files)
 * 
 * Note: Google Drive files MUST be set to "Anyone with the link can view" for this to work
 */
export function convertDriveUrl(url: string): string {
  if (!url) return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'

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

  // If already converted or other format, return as is
  return url
}
