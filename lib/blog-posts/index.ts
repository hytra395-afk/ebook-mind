import { post01 } from './post-01'
import { post02 } from './post-02'

// Import các bài còn lại sẽ được thêm vào
export const allBlogPosts = [
  post01,
  post02,
  // Các bài 3-20 sẽ được thêm tiếp
]

export interface BlogPost {
  title: string
  slug: string
  category: string
  excerpt: string
  featured_image: string
  meta_title: string
  meta_description: string
  keywords: string[]
  read_time: number
  content: string
}
