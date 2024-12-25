'use client'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal = ({ isOpen, onClose, onConfirm, loading }: AlertModalProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'>
      <div className='fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg'>
        <div className='flex flex-col gap-y-4'>
          <div className='space-y-2 text-center'>
            <h2 className='text-lg font-semibold'>Are you absolutely sure?</h2>
            <p className='text-sm text-muted-foreground'>
              This action cannot be undone. This will permanently delete your account and remove all your data from our
              servers.
            </p>
          </div>
          <div className='flex items-center justify-end gap-x-2'>
            <button
              disabled={loading}
              onClick={onClose}
              className='rounded px-4 py-2 text-sm font-medium border hover:bg-accent'
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={onConfirm}
              className='rounded px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
