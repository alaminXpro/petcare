import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const productId = parseInt(params.id)

    // Check if user has already reviewed
    const existingReview = await db.productReview.findFirst({
      where: {
        productId,
        customerId: session.user.id
      }
    })

    if (existingReview) {
      return NextResponse.json({ success: false, error: 'You have already reviewed this product' }, { status: 400 })
    }

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

    if (!hasPurchased) {
      return NextResponse.json(
        { success: false, error: 'You must purchase this product before reviewing' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { rating, comment } = body

    const review = await db.productReview.create({
      data: {
        productId,
        customerId: session.user.id,
        rating,
        comment,
        verified_purchase: true
      }
    })

    return NextResponse.json({ success: true, review }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
