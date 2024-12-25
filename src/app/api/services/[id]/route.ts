import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    const serviceId = parseInt(params.id)

    const service = await db.service.findUnique({
      where: { serviceId },
      include: {
        ServiceReviews: {
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

    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 })
    }

    let canReview = false

    if (session?.user) {
      // Check if user has booked the service
      const hasBooked = await db.orderItem.findFirst({
        where: {
          serviceId,
          order: {
            customerId: session.user.id,
            payment_status: 'Paid'
          }
        }
      })

      // Check if user has already reviewed
      const hasReviewed = service.ServiceReviews.some(review => review.customer.id === session.user.id)

      canReview = !!hasBooked && !hasReviewed
    }

    console.log('Can review:', canReview) // Debug log

    return NextResponse.json(
      {
        success: true,
        service,
        canReview
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
