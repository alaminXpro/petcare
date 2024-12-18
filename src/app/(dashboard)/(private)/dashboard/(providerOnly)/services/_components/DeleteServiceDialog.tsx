'use client'

import { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material'
import { toast } from 'sonner'

import { deleteService } from '@/app/actions/service'

interface DeleteServiceDialogProps {
  open: boolean
  onClose: () => void
  serviceId: number
}

export function DeleteServiceDialog({ open, onClose, serviceId }: DeleteServiceDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!serviceId) {
      toast.error('Service ID is missing')

      return
    }

    setLoading(true)

    try {
      const result = await deleteService(serviceId)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Service deleted successfully')
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Delete Service</DialogTitle>
      <DialogContent>Are you sure you want to delete this service?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='contained' color='error' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
