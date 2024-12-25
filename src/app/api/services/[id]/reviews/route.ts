import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const serviceId = parseInt(params.id)

    // Check if user has already reviewed
    const existingReview = await db.serviceReview.findFirst({
      where: {
        serviceId,
        customerId: session.user.id
      }
    })

    if (existingReview) {
      return NextResponse.json({ success: false, error: 'You have already reviewed this service' }, { status: 400 })
    }

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

    if (!hasBooked) {
      return NextResponse.json(
        { success: false, error: 'You must book this service before reviewing' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { rating, comment } = body

    const review = await db.serviceReview.create({
      data: {
        serviceId,
        customerId: session.user.id,
        rating,
        comment,
        verified_booking: true
      }
    })

    return NextResponse.json({ success: true, review }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
