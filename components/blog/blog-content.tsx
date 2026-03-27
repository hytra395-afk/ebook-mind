'use client'

import { marked } from 'marked'
import { useMemo } from 'react'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  const htmlContent = useMemo(() => {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    })
    
    let processedContent = marked(content) as string
    
    // Wrap ebook links section with special styling
    if (processedContent.includes('Các ebook liên quan bạn có thể tham khảo:')) {
      processedContent = processedContent.replace(
        /<h2>Các ebook liên quan bạn có thể tham khảo:<\/h2>([\s\S]*?)(?=<h2|$)/,
        '<div class="ebook-links-section"><h2>Các ebook liên quan bạn có thể tham khảo:</h2>$1</div>'
      )
    }
    
    return processedContent
  }, [content])

  return (
    <div className="prose prose-lg prose-headings:font-bold prose-p:text-gray-700 prose-a:text-purple-600 prose-strong:text-gray-900 max-w-none w-full">
      <style jsx global>{`
        .prose {
          color: #374151;
          line-height: 1.75;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        .prose strong {
          color: #111827;
          font-weight: 600;
        }
        .prose a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .prose a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }
        .prose ul, .prose ol {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          line-height: 1.75;
        }
        .prose blockquote {
          border-left: 4px solid;
          border-image: linear-gradient(to bottom, #6366f1, #8b5cf6, #d946ef) 1;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
          background: linear-gradient(to right, #f9fafb, #ffffff);
          padding: 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .prose code {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #db2777;
          font-weight: 500;
        }
        .prose pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        .prose pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
        .prose img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          max-width: 100%;
          height: auto;
        }
        .prose table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }
        .prose th {
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          color: white;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
        }
        .prose td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .prose tr:hover {
          background: #f9fafb;
        }
        
        /* Ebook links section styling */
        .ebook-links-section {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin: 2rem 0;
        }
        
        .ebook-links-section ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .ebook-links-section li {
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: white;
          border-radius: 0.5rem;
          border: 1px solid #f1f5f9;
          transition: all 0.2s;
        }
        
        .ebook-links-section li:last-child {
          margin-bottom: 0;
        }
        
        .ebook-links-section li:hover {
          border-color: #8b5cf6;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
          transform: translateY(-1px);
        }
        
        .ebook-links-section li strong {
          color: #6366f1;
          font-weight: 600;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 0.25rem;
        }
        
        .ebook-links-section li a {
          color: #4f46e5;
          font-weight: 500;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .ebook-links-section li:hover a {
          color: #6366f1;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
