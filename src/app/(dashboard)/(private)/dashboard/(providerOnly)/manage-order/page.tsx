// Component Imports
import OrderList from '@views/apps/ecommerce/orders/list'

// Data Imports
import { getProviderOrders, getProviderOrderStats } from '@/app/actions/provider-orders'

const OrdersListPage = async () => {
  const [ordersResult, statsResult] = await Promise.all([getProviderOrders(), getProviderOrderStats()])

  return (
    <OrderList
      orderData={ordersResult.success ? ordersResult.orders : []}
      orderStats={
        statsResult.success && statsResult.stats
          ? statsResult.stats
          : {
              pending: 0,
              completed: 0,
              failed: 0
            }
      }
    />
  )
}

export default OrdersListPage
