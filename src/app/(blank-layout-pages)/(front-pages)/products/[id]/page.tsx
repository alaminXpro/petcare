import { notFound } from 'next/navigation'

import Head from 'next/head'

import { Container, Grid, Box } from '@mui/material'

import TawkTo from '@/components/TawkTo'
import ProductMetaTags from '@/components/ProductMetaTags'

import ProductOverview, { ProductImages, ProductDetails } from './ProductOverview'
import ReviewSection from './ReviewSection'

async function getProductData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
    cache: 'no-store'
  })

  return res.json()
}

const DEMO_REVIEWS = [
  {
    reviewId: '1',
    rating: 5,
    comment: 'Great product! My pet loves it.',
    customerName: 'John Doe',
    created_at: new Date().toISOString(),
    verified_purchase: true
  },
  {
    reviewId: '2',
    rating: 4,
    comment: 'Good quality but a bit pricey',
    customerName: 'Jane Smith',
    created_at: new Date().toISOString(),
    verified_purchase: true
  }
]

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await getProductData(params.id)

  if (!data) {
    notFound()
  }

  const { product, canReview } = data

  const reviews =
    product.ProductReviews?.length > 0
      ? product.ProductReviews.map(review => ({
          reviewId: review.reviewId.toString(),
          rating: review.rating,
          comment: review.comment,
          customerName: review.customer.name,
          created_at: review.created_at,
          verified_purchase: review.verified_purchase
        }))
      : DEMO_REVIEWS

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <ProductMetaTags product={product} />
      <TawkTo
        providerId={product.supplierId}
        itemInfo={{
          id: product.productId.toString(),
          type: 'product',
          name: product.name
        }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <ProductImages product={product} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductDetails product={product} />
        </Grid>
        <Grid item xs={12}>
          <ReviewSection
            reviews={reviews}
            productId={params.id}
            canReview={canReview}
            isDemoReviews={product.ProductReviews?.length === 0}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
