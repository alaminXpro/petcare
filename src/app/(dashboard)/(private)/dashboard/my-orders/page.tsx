import { getCustomerOrders } from '@/app/actions/customer-orders'
import CustomerOrderList from '@/views/apps/ecommerce/orders/customer'

export default async function MyOrdersPage() {
  const { orders, success, message } = await getCustomerOrders()

  if (!success) {
    return (
      <div>
        <h1>Error</h1>
        <p>{message}</p>
      </div>
    )
  }

  return <CustomerOrderList orders={orders || []} />
}
