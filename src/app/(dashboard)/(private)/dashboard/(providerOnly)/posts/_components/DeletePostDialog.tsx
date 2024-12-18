'use client'

import { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material'
import { toast } from 'sonner'

import { deletePost } from '@/app/actions/post'

interface DeletePostDialogProps {
  open: boolean
  onClose: () => void
  postId: number
}

export function DeletePostDialog({ open, onClose, postId }: DeletePostDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!postId) {
      toast.error('Post ID is missing')

      return
    }

    setLoading(true)

    try {
      const result = await deletePost(postId)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Post deleted successfully')
      onClose()

      // Optionally refresh the page or update the table data
      window.location.reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        {postId ? (
          <p>Are you sure you want to delete this post? This action cannot be undone.</p>
        ) : (
          <p>Post ID is missing. Cannot delete the post.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='contained' color='error' disabled={loading || !postId}>
          {loading ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
