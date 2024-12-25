'use server'

import { PaymentMethod, PaymentStatus, DeliveryStatus } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function createOrder(formData: {
  customer_phone: string
  shipping_address: string
  order_notes?: string
  payment_method?: PaymentMethod
  items: {
    type: 'product' | 'service'
    id: number
    quantity: number
    price: number
  }[]
}) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' }
    }

    // Calculate total amount
    const totalAmount = formData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Determine order type (if all items are products or all items are services)
    const orderType = formData.items.every(item => item.type === 'product') ? 'Product' : 'Service'

    // Initial status history
    const statusHistory = {
      created: new Date().toISOString(),
      payment_status: [{ status: 'Pending', timestamp: new Date().toISOString() }],
      delivery_status: [{ status: 'Processing', timestamp: new Date().toISOString() }]
    }

    // Create order
    const order = await db.order.create({
      data: {
        customerId: session.user.id,
        customer_phone: formData.customer_phone,
        shipping_address: formData.shipping_address,
        order_notes: formData.order_notes,
        payment_status: PaymentStatus.Pending,
        delivery_status: DeliveryStatus.Processing,
        payment_method: formData.payment_method || PaymentMethod.CashOnDelivery,
        transactionId: `TR${Date.now()}`,
        order_type: orderType,
        total_amount: totalAmount,
        quantity: formData.items.reduce((acc, item) => acc + item.quantity, 0),
        status_history: statusHistory,
        OrderItems: {
          create: formData.items.map(item => ({
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
            ...(item.type === 'product' ? { productId: item.id } : { serviceId: item.id })
          }))
        }
      },
      include: {
        OrderItems: true
      }
    })

    return { success: true, order }
  } catch (error) {
    console.error('Order creation error:', error)

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create order'
    }
  }
}
