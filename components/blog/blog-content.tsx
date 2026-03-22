interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <style jsx global>{`
        .prose {
          color: #374151;
        }
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h4 {
          font-size: 1.25rem;
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
          color: #7c3aed;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .prose a:hover {
          color: #6d28d9;
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
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
