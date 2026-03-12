'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Undo, Redo, Type, Eraser
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = 'Viết nội dung...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [stats, setStats] = useState({ words: 0, chars: 0 })
  const [isEmpty, setIsEmpty] = useState(true)

  // Initialize content
  useEffect(() => {
    if (editorRef.current && content && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content
      updateStats()
      setIsEmpty(!content || content === '<br>' || content === '<p><br></p>')
    }
  }, [])

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      setIsEmpty(!html || html === '<br>' || html === '<p><br></p>')
      onChange(html)
      updateStats()
    }
  }, [onChange])

  // Update word and character count
  const updateStats = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.textContent || ''
      const words = text.trim().split(/\s+/).filter(Boolean).length
      const chars = text.length
      setStats({ words, chars })
    }
  }, [])

  // Update active formats when selection changes
  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()
    
    try {
      if (document.queryCommandState('bold')) formats.add('bold')
      if (document.queryCommandState('italic')) formats.add('italic')
      if (document.queryCommandState('underline')) formats.add('underline')
      if (document.queryCommandState('strikeThrough')) formats.add('strikethrough')
      if (document.queryCommandState('insertUnorderedList')) formats.add('ul')
      if (document.queryCommandState('insertOrderedList')) formats.add('ol')
      
      // Check heading levels
      const selection = window.getSelection()
      if (selection && selection.anchorNode) {
        let node = selection.anchorNode as HTMLElement
        if (node.nodeType === 3) node = node.parentElement as HTMLElement
        
        while (node && node !== editorRef.current) {
          const tagName = node.tagName?.toLowerCase()
          if (tagName === 'h1') formats.add('h1')
          if (tagName === 'h2') formats.add('h2')
          if (tagName === 'h3') formats.add('h3')
          if (tagName === 'h4') formats.add('h4')
          node = node.parentElement as HTMLElement
        }
      }
    } catch (e) {
      // Ignore errors
    }
    
    setActiveFormats(formats)
  }, [])

  // Listen to selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current || editorRef.current?.contains(document.activeElement)) {
        updateActiveFormats()
      }
    }
    
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [updateActiveFormats])

  // Format text commands
  const formatText = useCallback((command: string) => {
    document.execCommand(command, false, undefined)
    editorRef.current?.focus()
    updateActiveFormats()
  }, [updateActiveFormats])

  // Format heading
  const formatHeading = useCallback((tag: string) => {
    document.execCommand('formatBlock', false, tag)
    editorRef.current?.focus()
    updateActiveFormats()
  }, [updateActiveFormats])

  // Insert link
  const insertLink = useCallback(() => {
    const url = window.prompt('Nhập URL liên kết:')
    if (url) {
      document.execCommand('createLink', false, url)
      editorRef.current?.focus()
    }
  }, [])

  // Insert image
  const insertImage = useCallback(() => {
    const url = window.prompt('Nhập URL ảnh:')
    if (url) {
      document.execCommand('insertImage', false, url)
      editorRef.current?.focus()
    }
  }, [])

  // Remove formatting
  const removeFormat = useCallback(() => {
    document.execCommand('removeFormat', false, undefined)
    document.execCommand('formatBlock', false, 'p')
    editorRef.current?.focus()
  }, [])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          formatText('bold')
          break
        case 'i':
          e.preventDefault()
          formatText('italic')
          break
        case 'u':
          e.preventDefault()
          formatText('underline')
          break
        case 'z':
          if (!e.shiftKey) {
            e.preventDefault()
            document.execCommand('undo')
          }
          break
        case 'y':
          e.preventDefault()
          document.execCommand('redo')
          break
      }
    }
  }, [formatText])

  // Toolbar button component
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
      className={`p-2 rounded transition-colors ${
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

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar - Fixed */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Undo/Redo */}
        <ToolbarButton 
          onClick={() => document.execCommand('undo')} 
          title="Hoàn tác (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => document.execCommand('redo')} 
          title="Làm lại (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Paragraph */}
        <ToolbarButton 
          onClick={() => formatHeading('p')} 
          title="Đoạn văn bản (P)"
        >
          <Type className="w-4 h-4" />
        </ToolbarButton>

        {/* Headings */}
        <ToolbarButton 
          onClick={() => formatHeading('h1')} 
          isActive={activeFormats.has('h1')}
          title="Tiêu đề 1 (H1)"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatHeading('h2')} 
          isActive={activeFormats.has('h2')}
          title="Tiêu đề 2 (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatHeading('h3')} 
          isActive={activeFormats.has('h3')}
          title="Tiêu đề 3 (H3)"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatHeading('h4')} 
          isActive={activeFormats.has('h4')}
          title="Tiêu đề 4 (H4)"
        >
          <Heading4 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text formatting */}
        <ToolbarButton 
          onClick={() => formatText('bold')} 
          isActive={activeFormats.has('bold')}
          title="In đậm (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatText('italic')} 
          isActive={activeFormats.has('italic')}
          title="In nghiêng (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatText('underline')} 
          isActive={activeFormats.has('underline')}
          title="Gạch chân (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatText('strikeThrough')} 
          isActive={activeFormats.has('strikethrough')}
          title="Gạch ngang"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <ToolbarButton 
          onClick={() => formatText('insertUnorderedList')} 
          isActive={activeFormats.has('ul')}
          title="Danh sách dấu đầu dòng"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => formatText('insertOrderedList')} 
          isActive={activeFormats.has('ol')}
          title="Danh sách đánh số"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Link & Image */}
        <ToolbarButton 
          onClick={insertLink} 
          title="Chèn liên kết"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={insertImage} 
          title="Chèn ảnh"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Remove format */}
        <ToolbarButton 
          onClick={removeFormat} 
          title="Xóa định dạng"
        >
          <Eraser className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor Area - Scrollable */}
      <div className="relative">
        {isEmpty && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable={true}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onClick={updateActiveFormats}
          className="wysiwyg-editor min-h-[300px] max-h-[500px] overflow-y-auto p-4 focus:outline-none"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-50 text-xs text-gray-500">
        <span>{stats.words} từ • {stats.chars} ký tự</span>
        <span>✨ WYSIWYG Editor - Tự xây dựng 100%</span>
      </div>

      {/* Global styles for editor content */}
      <style jsx global>{`
        .wysiwyg-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          line-height: 1.2;
        }
        .wysiwyg-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          line-height: 1.3;
        }
        .wysiwyg-editor h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          line-height: 1.4;
        }
        .wysiwyg-editor h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1em 0;
          line-height: 1.5;
        }
        .wysiwyg-editor p {
          margin: 1em 0;
        }
        .wysiwyg-editor ul,
        .wysiwyg-editor ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        .wysiwyg-editor li {
          margin: 0.5em 0;
        }
        .wysiwyg-editor a {
          color: #9333ea;
          text-decoration: underline;
        }
        .wysiwyg-editor a:hover {
          color: #7e22ce;
        }
        .wysiwyg-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
        }
        .wysiwyg-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        .wysiwyg-editor strong,
        .wysiwyg-editor b {
          font-weight: bold;
        }
        .wysiwyg-editor em,
        .wysiwyg-editor i {
          font-style: italic;
        }
        .wysiwyg-editor u {
          text-decoration: underline;
        }
        .wysiwyg-editor strike,
        .wysiwyg-editor s {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  )
}
