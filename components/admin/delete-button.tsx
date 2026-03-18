'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface DeleteButtonProps {
  itemId: string
  itemType: 'ebook' | 'combo'
  itemTitle: string
  onDelete?: () => void
  variant?: 'icon' | 'button' | 'text'
  className?: string
}

export default function DeleteButton({
  itemId,
  itemType,
  itemTitle,
  onDelete,
  variant = 'text',
  className = ''
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const { adminDelete } = await import('@/lib/admin-api')
      const endpoint = itemType === 'ebook' 
        ? `/api/admin/ebooks/${itemId}`
        : `/api/admin/combos/${itemId}`
      
      await adminDelete(endpoint)

      setOpen(false)
      
      if (onDelete) {
        onDelete()
      } else {
        window.location.reload()
      }
    } catch (error: any) {
      alert(error.message || 'Có lỗi xảy ra khi xóa')
      setDeleting(false)
    }
  }

  const renderTrigger = () => {
    const baseClasses = deleting ? 'opacity-50 cursor-not-allowed' : ''
    
    if (variant === 'icon') {
      return (
        <button
          className={`p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition ${baseClasses} ${className}`}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )
    }
    
    if (variant === 'button') {
      return (
        <button
          className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${baseClasses} ${className}`}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4" />
          Xóa
        </button>
      )
    }
    
    return (
      <button
        className={`inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 ${baseClasses} ${className}`}
        disabled={deleting}
      >
        <Trash2 className="h-3.5 w-3.5" />
        Xóa
      </button>
    )
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        {renderTrigger()}
      </AlertDialog.Trigger>
      
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50 animate-in zoom-in-95 duration-200">
          <AlertDialog.Title className="text-xl font-bold text-gray-900 mb-2">
            Xóa {itemType === 'ebook' ? 'ebook' : 'combo'} này?
          </AlertDialog.Title>
          
          <AlertDialog.Description className="text-gray-600 mb-6">
            <p className="mb-2">
              Bạn đang xóa: <span className="font-semibold text-gray-900">"{itemTitle}"</span>
            </p>
            <p className="text-sm text-red-600">
              {itemType === 'ebook' ? 'Ebook' : 'Combo'} sẽ bị xóa vĩnh viễn khỏi hệ thống. 
              Hành động này không thể hoàn tác.
            </p>
          </AlertDialog.Description>

          <div className="flex gap-3 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                disabled={deleting}
              >
                Hủy
              </button>
            </AlertDialog.Cancel>
            
            <AlertDialog.Action asChild>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
