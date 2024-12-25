'use client'

import { useState } from 'react'

import { Typography, Rating, Box, Chip, Grid, Button } from '@mui/material'
import { MessageSquare, Star, Check } from 'lucide-react'

import AddReviewDialog from './AddReviewDialog'

interface Review {
  reviewId: string
  rating: number
  comment: string
  customerName: string
  created_at: string
  verified_booking: boolean // Changed from verified_purchase
}

interface ReviewSectionProps {
  reviews: Review[]
  serviceId: string
  isDemoReviews?: boolean
}

export default function ReviewSection({ reviews, serviceId, isDemoReviews }: ReviewSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              mb: 3
            }}
          >
            <Typography variant='h5' component='h2' sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MessageSquare className='w-6 h-6 mr-2' />
              Customer Reviews {isDemoReviews && <Chip label='Demo Reviews' size='small' className='ml-2' />}
            </Typography>
            <Button
              variant='contained'
              onClick={() => setIsDialogOpen(true)}
              startIcon={<Star />}
              sx={{
                background: 'linear-gradient(to right, #3b82f6, #9333ea)',
                '&:hover': {
                  background: 'linear-gradient(to right, #2563eb, #7e22ce)'
                }
              }}
            >
              Add Review
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {reviews.length > 0 ? (
            <div className='space-y-4'>
              {reviews.map(review => (
                <Box key={review.reviewId} className='border rounded-lg p-4 space-y-2 bg-gray-50'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <Rating value={review.rating} readOnly />
                    <Typography variant='subtitle1' component='span' className='font-bold'>
                      {review.customerName}
                    </Typography>
                    {review.verified_booking && (
                      <Chip
                        icon={<Check className='w-4 h-4' />}
                        label='Verified Booking'
                        color='success'
                        size='small'
                        className='bg-green-100 text-green-800'
                      />
                    )}
                  </div>
                  <Typography variant='body1' className='text-gray-700'>
                    {review.comment}
                  </Typography>
                  <Typography variant='body2' className='text-gray-500'>
                    {new Date(review.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </div>
          ) : (
            <Typography variant='body1' className='text-center text-gray-500 py-8'>
              No reviews yet. Be the first to review this service!
            </Typography>
          )}
        </Grid>
      </Grid>
      <AddReviewDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        serviceId={serviceId}
        onReviewAdded={() => window.location.reload()}
      />
    </Box>
  )
}
