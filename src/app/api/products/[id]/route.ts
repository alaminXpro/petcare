import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    const productId = parseInt(params.id)

    const product = await db.product.findUnique({
      where: { productId },
      include: {
        ProductReviews: {
          include: {
            customer: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    let canReview = false
    if (session?.user) {
      // Check if user has purchased the product
      const hasPurchased = await db.orderItem.findFirst({
        where: {
          productId,
          order: {
            customerId: session.user.id,
            payment_status: 'Paid'
          }
        }
      })

      // Check if user has already reviewed
      const hasReviewed = product.ProductReviews.some(review => review.customer.id === session.user.id)

      canReview = !!hasPurchased && !hasReviewed
    }

    console.log('Can review:', canReview) // Debug log

    return NextResponse.json(
      {
        success: true,
        product,
        canReview
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
