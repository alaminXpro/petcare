import type { DeliveryStatus, PaymentStatus, PaymentMethod } from '@prisma/client'

export type Customer = {
  id: number
  customer: string
  customerId: string
  email: string
  country: string
  countryCode: string
  countryFlag?: string
  order: number
  totalSpent: number
  avatar: string
  status?: string
  contact?: string
}

export type ReferralsType = {
  id: number
  user: string
  email: string
  avatar: string
  referredId: number
  status: string
  value: string
  earning: string
}

export type ReviewType = {
  id: number
  product: string
  companyName: string
  productImage: string
  reviewer: string
  email: string
  avatar: string
  date: string
  status: string
  review: number
  head: string
  para: string
}

export type ProductType = {
  id: number
  productName: string
  category: string
  stock: boolean
  sku: number
  price: string
  qty: number
  status: string
  image: string
  productBrand: string
}

export type OrderType = {
  orderId: number
  customerId: string
  customer: {
    name: string | null
    email: string | null
    image: string | null
  }
  order_type: 'Product' | 'Service'
  quantity: number
  total_amount: number
  created_at: Date
  updated_at: Date
  payment_status: PaymentStatus
  order_notes?: string | null
  customer_phone: string
  shipping_address: string
  delivery_status: DeliveryStatus
  delivery_date?: Date | null
  transactionId: string
  payment_method: PaymentMethod
  status_history?: any
  OrderItems: Array<{
    orderItemId: number
    quantity: number
    price: number
    subtotal: number
    product?: {
      name: string
      images: string[]
    } | null
    service?: {
      title: string
      images: string[]
    } | null
  }>
}

export type ECommerceType = {
  products: ProductType[]
  orderData: OrderType[]
  customerData: Customer[]
  reviews: ReviewType[]
  referrals: ReferralsType[]
}
