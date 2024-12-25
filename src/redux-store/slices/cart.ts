import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface CartItem {
  productId?: number
  serviceId?: number
  name: string
  price: number
  quantity: number
  image: string
  type: 'product' | 'service'
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => {
        if (action.payload.type === 'product' && item.type === 'product') {
          return item.productId === action.payload.productId
        }

        if (action.payload.type === 'service' && item.type === 'service') {
          return item.serviceId === action.payload.serviceId
        }

        return false
      })

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; type: 'product' | 'service' }>) => {
      state.items = state.items.filter(item => {
        if (action.payload.type === 'product' && item.type === 'product') {
          return item.productId !== action.payload.id
        }

        if (action.payload.type === 'service' && item.type === 'service') {
          return item.serviceId !== action.payload.id
        }

        return true
      })
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; type: 'product' | 'service'; quantity: number }>) => {
      const item = state.items.find(item => {
        if (action.payload.type === 'product' && item.type === 'product') {
          return item.productId === action.payload.id
        }

        if (action.payload.type === 'service' && item.type === 'service') {
          return item.serviceId === action.payload.id
        }

        return false
      })

      if (item) {
        item.quantity = action.payload.quantity
      }
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
