import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/redux-store'
import { addToCart, removeFromCart, updateQuantity } from '@/redux-store/slices/cart'

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cartReducer)

  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleAddToProduct = (product: {
    productId: number
    name: string
    price: number
    quantity: number
    image: string
  }) => {
    dispatch(addToCart({ type: 'product', ...product }))
  }

  const handleAddToService = (service: {
    serviceId: number
    name: string
    price: number
    quantity: number
    image: string
  }) => {
    dispatch(addToCart({ type: 'service', ...service }))
  }

  const handleRemoveFromCart = (type: 'product' | 'service', id: number) => {
    dispatch(removeFromCart({ type, id }))
  }

  const handleUpdateQuantity = (type: 'product' | 'service', id: number, quantity: number) => {
    dispatch(updateQuantity({ type, id, quantity }))
  }

  return {
    items: cart.items,
    itemsCount: cartItemsCount,
    total: cartTotal,
    addProduct: handleAddToProduct,
    addService: handleAddToService,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity
  }
}
