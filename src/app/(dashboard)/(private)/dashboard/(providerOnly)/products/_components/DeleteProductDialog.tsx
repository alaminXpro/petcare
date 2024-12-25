'use client'

import { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material'

import { toast } from 'sonner'

import { deleteProduct } from '@/app/actions/product'

interface DeleteProductDialogProps {
  open: boolean
  onClose: () => void
  productId: number
}

export function DeleteProductDialog({ open, onClose, productId }: DeleteProductDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!productId) {
      toast.error('Product ID is missing')
      
return
    }

    setLoading(true)

    try {
      const result = await deleteProduct(productId)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('Product deleted successfully')
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        {productId ? (
          <p>Are you sure you want to delete this product?</p>
        ) : (
          <p>Product ID is missing. Cannot delete the product.</p>
        )}
      </DialogContent>
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
