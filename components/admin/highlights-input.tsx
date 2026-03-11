'use client'

import { useState } from 'react'
import { Plus, X, GripVertical } from 'lucide-react'

interface HighlightsInputProps {
  highlights: string[]
  onChange: (highlights: string[]) => void
}

export default function HighlightsInput({ highlights, onChange }: HighlightsInputProps) {
  const [newItem, setNewItem] = useState('')

  const addHighlight = () => {
    if (newItem.trim()) {
      onChange([...highlights, newItem.trim()])
      setNewItem('')
    }
  }

  const removeHighlight = (index: number) => {
    onChange(highlights.filter((_, i) => i !== index))
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...highlights]
    newHighlights[index] = value
    onChange(newHighlights)
  }

  const moveHighlight = (from: number, to: number) => {
    if (to < 0 || to >= highlights.length) return
    const newHighlights = [...highlights]
    const [removed] = newHighlights.splice(from, 1)
    newHighlights.splice(to, 0, removed)
    onChange(newHighlights)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addHighlight()
    }
  }

  return (
    <div className="space-y-3">
      {/* Existing highlights */}
      {highlights.map((item, index) => (
        <div key={index} className="flex items-center gap-2 group">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 cursor-grab"
            onMouseDown={(e) => e.preventDefault()}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          
          <span className="text-green-600 font-bold">✓</span>
          
          <input
            type="text"
            value={item}
            onChange={(e) => updateHighlight(index, e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              onClick={() => moveHighlight(index, index - 1)}
              disabled={index === 0}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              title="Di chuyển lên"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveHighlight(index, index + 1)}
              disabled={index === highlights.length - 1}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              title="Di chuyển xuống"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeHighlight(index)}
              className="p-1 text-red-400 hover:text-red-600"
              title="Xóa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Add new highlight */}
      <div className="flex items-center gap-2">
        <div className="p-1 text-transparent">
          <GripVertical className="w-4 h-4" />
        </div>
        <span className="text-gray-300 font-bold">✓</span>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Thêm điểm nổi bật mới..."
          className="flex-1 border border-dashed rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addHighlight}
          disabled={!newItem.trim()}
          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Nhấn Enter để thêm nhanh • Kéo để sắp xếp
      </p>
    </div>
  )
}
