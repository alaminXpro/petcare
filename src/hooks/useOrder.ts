'use client'

import { useState, useEffect } from 'react'

interface OrderDetails {
  orderId: number
  customer_phone: string
  shipping_address: string
  order_notes?: string
  payment_status: string
  delivery_status: string
  created_at: string
  OrderItems: Array<{
    quantity: number
    price: number
    subtotal: number
    product?: {
      name: string
      images: string[]
      brand: string
    }
    service?: {
      title: string
      images: string[]
      provider: {
        user: {
          name: string
        }
      }
    }
  }>
}

export function useOrder(orderId: string | null) {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false)

        return
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`)
        const data = await response.json()

        if (data.success) {
          setOrder(data.order)
        } else {
          setError(data.message || 'Failed to fetch order')
        }
      } catch (err) {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  return { order, loading, error }
}
