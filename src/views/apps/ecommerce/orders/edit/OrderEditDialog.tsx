'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Divider,
  Alert
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { DeliveryStatus, PaymentStatus } from '@prisma/client'
import { toast } from 'sonner'

import { updateOrderStatus } from '@/app/actions/provider-orders'
import type { OrderType } from '@/types/apps/ecommerceTypes'

interface OrderEditDialogProps {
  open: boolean
  onClose: () => void
  order: OrderType
  onUpdate: () => void // Add this prop
}

export default function OrderEditDialog({ open, onClose, order, onUpdate }: OrderEditDialogProps) {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    delivery_status: order.delivery_status,
    payment_status: order.payment_status,

    // Format the date properly or set to null if empty
    delivery_date: order.delivery_date ? new Date(order.delivery_date).toISOString().split('T')[0] : null
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // Clean up the data before sending
      const updateData = {
        delivery_status: formData.delivery_status,
        payment_status: formData.payment_status,
        delivery_date: formData.delivery_date ? new Date(formData.delivery_date) : null
      }

      const result = await updateOrderStatus(order.orderId, updateData)

      if (result.success) {
        toast.success('Order updated successfully')
        onUpdate() // Call onUpdate instead of onClose
      } else {
        toast.error(result.message || 'Failed to update order')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Edit Order #{order.orderId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2, mt: 2 }}>
              Customer Information
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography>Name: {order.customer.name}</Typography>
              <Typography>Email: {order.customer.email}</Typography>
              <Typography>Phone: {order.customer_phone}</Typography>
            </Box>
          </Grid>

          {/* Shipping Information */}
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Shipping Information
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography>Address: {order.shipping_address}</Typography>
              {order.order_notes && <Typography>Notes: {order.order_notes}</Typography>}
            </Box>
          </Grid>

          {/* Order Items */}
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Order Items
            </Typography>
            {order.OrderItems.map((item: any) => (
              <Box key={item.orderItemId} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 1 }}>
                <Typography>
                  {item.product?.name || item.service?.title} x {item.quantity}
                </Typography>
                <Typography color='text.secondary'>
                  ${item.price} each - Subtotal: ${item.subtotal}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Status Updates */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label='Delivery Status'
              value={formData.delivery_status}
              onChange={e => setFormData({ ...formData, delivery_status: e.target.value as DeliveryStatus })}
            >
              {Object.values(DeliveryStatus).map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label='Payment Status'
              value={formData.payment_status}
              onChange={e => setFormData({ ...formData, payment_status: e.target.value as PaymentStatus })}
            >
              {Object.values(PaymentStatus).map(status => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              type='date'
              fullWidth
              label='Delivery Date'
              value={formData.delivery_date || ''}
              onChange={e =>
                setFormData({
                  ...formData,
                  delivery_date: e.target.value || null
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={onClose} variant='outlined' color='secondary'>
                Cancel
              </Button>
              <LoadingButton onClick={handleSubmit} loading={loading} variant='contained'>
                Update Order
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
