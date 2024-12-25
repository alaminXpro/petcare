'use client'

import Image from 'next/image'

import { Drawer, Box, Typography, IconButton, Button } from '@mui/material'
import { X, Minus, Plus, Trash2 } from 'lucide-react'

import { useCart } from '@/redux-store/hooks/useCart'
import Link from './Link'

interface CartSidebarProps {
  open: boolean
  onClose: () => void
}

const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const { items, total, removeFromCart, updateQuantity } = useCart()

  const handleUpdateQuantity = (
    type: 'product' | 'service',
    id: number,
    currentQuantity: number,
    increment: boolean
  ) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1

    if (newQuantity > 0) {
      updateQuantity(type, id, newQuantity)
    }
  }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant='h6'>Shopping Cart ({items.length})</Typography>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto'
          }}
        >
          {items.map(item => (
            <Box
              key={item.type === 'product' ? `p-${item.productId}` : `s-${item.serviceId}`}
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: 1
              }}
            >
              <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                <Image src={item.image} alt={item.name} fill className='object-cover rounded' sizes='80px' />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  {item.type === 'product' ? 'Product' : 'Service'}
                </Typography>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                  ${item.price.toFixed(2)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleUpdateQuantity(
                        item.type,
                        item.type === 'product' ? (item.productId ?? 0) : (item.serviceId ?? 0),
                        item.quantity,
                        false
                      )
                    }
                  >
                    <Minus size={16} />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleUpdateQuantity(
                        item.type,
                        item.type === 'product' ? (item.productId ?? 0) : (item.serviceId ?? 0),
                        item.quantity,
                        true
                      )
                    }
                  >
                    <Plus size={16} />
                  </IconButton>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() =>
                      removeFromCart(item.type, item.type === 'product' ? (item.productId ?? 0) : (item.serviceId ?? 0))
                    }
                    sx={{ ml: 'auto' }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.default', pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Total:</Typography>
            <Typography variant='h6'>${total.toFixed(2)}</Typography>
          </Box>

          <Link href='/checkout' passHref>
            <Button variant='contained' fullWidth size='large' disabled={items.length === 0}>
              Checkout
            </Button>
          </Link>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CartSidebar
