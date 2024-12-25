'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating, Typography } from '@mui/material'
import { Star, Send, X } from 'lucide-react'

interface AddReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  productId: string
}

export default function AddReviewDialog({ isOpen, onClose, productId }: AddReviewDialogProps) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating) {
      toast.error('Please select a rating')

      return
    }

    if (!comment.trim()) {
      toast.error('Please enter a review comment')

      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      toast.success('Review submitted successfully')
      setRating(0)
      setComment('')
      onClose()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle className='flex justify-between items-center'>
        <span className='flex items-center'>
          <Star className='w-6 h-6 mr-2 text-yellow-400' />
          Add a Review
        </span>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          <X className='w-6 h-6' />
        </button>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className='space-y-4'>
            <div>
              <Typography component='legend' className='font-semibold mb-1'>
                Your Rating
              </Typography>
              <Rating
                name='rating'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
                size='large'
              />
            </div>
            <TextField
              label='Your Review'
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={e => setComment(e.target.value)}
              variant='outlined'
            />
          </div>
        </DialogContent>
        <DialogActions className='p-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-300'
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center disabled:opacity-50'
          >
            <Send className='w-5 h-5 mr-2' />
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
