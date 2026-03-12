'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = 'Viết nội dung...' }: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Editor
        apiKey="no-api-key"
        onInit={(evt, editor) => editorRef.current = editor}
        value={content}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | bold italic underline strikethrough | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | removeformat | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              font-size: 14px;
              line-height: 1.6;
              padding: 10px;
            }
            h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
            h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
            h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
            h4 { font-size: 1em; font-weight: bold; margin: 1em 0; }
            p { margin: 1em 0; }
            img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
            a { color: #9333ea; text-decoration: underline; }
            a:hover { color: #7e22ce; }
          `,
          block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          statusbar: true,
          resize: false,
          language: 'vi',
          language_url: '/tinymce/langs/vi.js',
        }}
      />
      
      {/* Footer info */}
      <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
        <span>✨ WYSIWYG Editor - Thấy ngay kết quả khi format (H1, H2, H3, H4, Bold, Italic, Link, Ảnh)</span>
      </div>
    </div>
  )
}
