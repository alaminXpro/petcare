'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function getCustomerOrders() {
  try {
    const session = await auth()

    if (!session?.user?.id) return { success: false, message: 'Unauthorized' }

    const orders = await db.order.findMany({
      where: {
        customerId: session.user.id
      },
      include: {
        OrderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                brand: true,
                supplier: {
                  select: {
                    user: {
                      select: {
                        name: true,
                        email: true
                      }
                    }
                  }
                }
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
                        name: true,
                        email: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return { success: true, orders }
  } catch (error) {
    console.error('Failed to fetch customer orders:', error)

    return { success: false, message: 'Failed to fetch orders' }
  }
}
