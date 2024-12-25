'use server'

import { revalidatePath } from 'next/cache'

import type { DeliveryStatus, PaymentStatus } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function getProviderOrders() {
  try {
    const session = await auth()

    if (!session?.user?.id) return { success: false, message: 'Unauthorized' }

    const orders = await db.order.findMany({
      where: {
        OrderItems: {
          some: {
            OR: [
              {
                product: {
                  supplierId: session.user.id
                }
              },
              {
                service: {
                  providerId: session.user.id
                }
              }
            ]
          }
        }
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        OrderItems: {
          include: {
            product: true,
            service: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return { success: true, orders }
  } catch (error) {
    console.error('Failed to fetch provider orders:', error)

    return { success: false, message: 'Failed to fetch orders' }
  }
}

export async function updateOrderStatus(
  orderId: number,
  data: {
    delivery_status?: DeliveryStatus
    payment_status?: PaymentStatus
    delivery_date?: Date | null
  }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) return { success: false, message: 'Unauthorized' }

    // Verify this order belongs to the provider
    const order = await db.order.findFirst({
      where: {
        orderId,
        OrderItems: {
          some: {
            OR: [{ product: { supplierId: session.user.id } }, { service: { providerId: session.user.id } }]
          }
        }
      }
    })

    if (!order) return { success: false, message: 'Order not found' }

    // Update status history
    const statusHistory = {
      ...((order.status_history as any) || {}),
      updated: new Date().toISOString(),
      ...(data.payment_status && {
        payment_status: [
          ...((order.status_history as any)?.payment_status || []),
          { status: data.payment_status, timestamp: new Date().toISOString() }
        ]
      }),
      ...(data.delivery_status && {
        delivery_status: [
          ...((order.status_history as any)?.delivery_status || []),
          { status: data.delivery_status, timestamp: new Date().toISOString() }
        ]
      })
    }

    const updatedOrder = await db.order.update({
      where: { orderId },
      data: {
        ...data,
        status_history: statusHistory,
        updated_at: new Date()
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true
          }
        },
        OrderItems: {
          include: {
            product: true,
            service: true
          }
        }
      }
    })

    revalidatePath('/dashboard/manage-order')

    return { success: true, order: updatedOrder }
  } catch (error) {
    console.error('Failed to update order:', error)

    return { success: false, message: 'Failed to update order' }
  }
}

export async function getProviderOrderStats() {
  try {
    const session = await auth()

    if (!session?.user?.id) return { success: false, message: 'Unauthorized' }

    const stats = await db.order.groupBy({
      by: ['payment_status', 'delivery_status'],
      where: {
        OrderItems: {
          some: {
            OR: [{ product: { supplierId: session.user.id } }, { service: { providerId: session.user.id } }]
          }
        }
      },
      _count: {
        orderId: true
      }
    })

    const formattedStats = {
      pending: stats.filter((s: { payment_status: string }) => s.payment_status === 'Pending').reduce((acc: number, curr: { _count: { orderId: number } }) => acc + curr._count.orderId, 0),
      completed: stats
        .filter((s: { delivery_status: string }) => s.delivery_status === 'Delivered')
        .reduce((acc: number, curr: { _count: { orderId: number } }) => acc + curr._count.orderId, 0),
      failed: stats.filter((s: { delivery_status: string }) => s.delivery_status === 'Cancelled').reduce((acc: number, curr: { _count: { orderId: number } }) => acc + curr._count.orderId, 0)
    }

    return { success: true, stats: formattedStats }
  } catch (error) {
    console.error('Failed to fetch order stats:', error)

    return { success: false, message: 'Failed to fetch order stats' }
  }
}
