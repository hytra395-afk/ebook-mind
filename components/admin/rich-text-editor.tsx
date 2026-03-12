'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Minus,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo
} from 'lucide-react'
import { useCallback, useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = 'Viết nội dung...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-600 underline hover:text-purple-800',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const addImage = useCallback(() => {
    const url = window.prompt('Nhập URL ảnh:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Nhập URL:', previousUrl)
    
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children,
    title,
    disabled = false
  }: { 
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    title: string
    disabled?: boolean
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded transition ${
        disabled 
          ? 'text-gray-300 cursor-not-allowed' 
          : isActive 
            ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
            : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )

  const wordCount = editor.storage.characterCount?.words?.() || 
    editor.getText().split(/\s+/).filter(Boolean).length
  const charCount = editor.getText().length

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50">
        {/* Undo/Redo */}
        <ToolbarButton 
          onClick={() => editor?.chain().focus().undo().run()} 
          title="Hoàn tác (Ctrl+Z)"
          disabled={!editor?.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().redo().run()} 
          title="Làm lại (Ctrl+Y)"
          disabled={!editor?.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Text formatting */}
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleBold().run()} 
          isActive={editor?.isActive('bold')}
          title="In đậm (Ctrl+B)"
          disabled={!editor}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleItalic().run()} 
          isActive={editor?.isActive('italic')}
          title="In nghiêng (Ctrl+I)"
          disabled={!editor}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleUnderline().run()} 
          isActive={editor?.isActive('underline')}
          title="Gạch chân (Ctrl+U)"
          disabled={!editor}
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleStrike().run()} 
          isActive={editor?.isActive('strike')}
          title="Gạch ngang"
          disabled={!editor}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Headings */}
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor?.isActive('heading', { level: 1 })}
          title="Tiêu đề 1 (H1)"
          disabled={!editor}
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor?.isActive('heading', { level: 2 })}
          title="Tiêu đề 2 (H2)"
          disabled={!editor}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
          isActive={editor?.isActive('heading', { level: 3 })}
          title="Tiêu đề 3 (H3)"
          disabled={!editor}
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()} 
          isActive={editor?.isActive('heading', { level: 4 })}
          title="Tiêu đề 4 (H4)"
          disabled={!editor}
        >
          <Heading4 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Lists */}
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleBulletList().run()} 
          isActive={editor?.isActive('bulletList')}
          title="Danh sách dấu đầu dòng"
          disabled={!editor}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
          isActive={editor?.isActive('orderedList')}
          title="Danh sách đánh số"
          disabled={!editor}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().toggleBlockquote().run()} 
          isActive={editor?.isActive('blockquote')}
          title="Trích dẫn"
          disabled={!editor}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          title="Đường kẻ ngang"
          disabled={!editor}
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        {/* Link & Image */}
        <ToolbarButton 
          onClick={setLink} 
          isActive={editor?.isActive('link')}
          title="Chèn liên kết"
          disabled={!editor}
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={addImage} 
          title="Chèn ảnh"
          disabled={!editor}
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
        <span>{wordCount} từ • {charCount} ký tự</span>
        <span>Hỗ trợ: H1-H4, Bold, Italic, Link, Ảnh</span>
      </div>
    </div>
  )
}
