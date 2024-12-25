'use client'

import { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating, Typography } from '@mui/material'
import { Star, Send, X } from 'lucide-react'
import { toast } from 'sonner'

interface AddReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  serviceId: string
  onReviewAdded: () => void
}

export default function AddReviewDialog({ isOpen, onClose, serviceId, onReviewAdded }: AddReviewDialogProps) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !comment) {
      toast.error('Please provide both rating and comment')

      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/services/${serviceId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      toast.success('Review submitted successfully')
      onReviewAdded()
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
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center'
            disabled={isSubmitting}
          >
            <Send className='w-5 h-5 mr-2' />
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
