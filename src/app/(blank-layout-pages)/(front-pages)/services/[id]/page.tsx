import { notFound } from 'next/navigation'

import { Container, Grid, Box } from '@mui/material'

import TawkTo from '@/components/TawkTo'
import ServiceMetaTags from '@/components/ServiceMetaTags'

import ServiceOverview, { ServiceImages, ServiceDetails } from './ServiceOverview'
import ReviewSection from './ReviewSection'

async function getServiceData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/services/${id}`, {
    cache: 'no-store'
  })

  const data = await res.json()

  if (!data.success) {
    return null
  }

  return data // Return the whole response, not just data.service
}

const DEMO_REVIEWS = [
  {
    reviewId: '1',
    rating: 5,
    comment: 'Excellent service! My pet was well taken care of.',
    customerName: 'John Doe',
    created_at: new Date().toISOString(),
    verified_booking: true
  },
  {
    reviewId: '2',
    rating: 4,
    comment: 'Great service, professional staff',
    customerName: 'Jane Smith',
    created_at: new Date().toISOString(),
    verified_booking: true
  }
]

export default async function ServicePage({ params }: { params: { id: string } }) {
  const data = await getServiceData(params.id)

  if (!data) {
    notFound()
  }

  const { service, canReview } = data // Destructure both service and canReview

  const reviews =
    service.ServiceReviews?.length > 0
      ? service.ServiceReviews.map(review => ({
          reviewId: review.reviewId.toString(),
          rating: review.rating,
          comment: review.comment,
          customerName: review.customer.name,
          created_at: review.created_at,
          verified_booking: review.verified_booking
        }))
      : DEMO_REVIEWS

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <ServiceMetaTags service={service} />
      <TawkTo
        providerId={service.providerId}
        itemInfo={{
          id: service.serviceId.toString(),
          type: 'service',
          name: service.title
        }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <ServiceImages service={service} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceDetails service={service} />
        </Grid>
        <Grid item xs={12}>
          <ReviewSection reviews={reviews} serviceId={params.id} canReview={canReview} />
        </Grid>
      </Grid>
    </Container>
  )
}
