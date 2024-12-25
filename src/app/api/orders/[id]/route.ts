import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const order = await db.order.findFirst({
      where: {
        orderId: parseInt(params.id),
        customerId: session.user.id
      },
      include: {
        OrderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                brand: true
              }
            },
            service: {
              select: {
                title: true,
                images: true,
                provider: {
                  select: {
                    user: {
                      select: {
                        name: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Order fetch error:', error)

    return NextResponse.json({ success: false, message: 'Failed to fetch order' }, { status: 500 })
  }
}
