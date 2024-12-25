'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'

import { useOrder } from '@/hooks/useOrder'
import { formatDate } from '@/lib/utils'

const StepConfirmation = () => {
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    setOrderId(sessionStorage.getItem('orderId'))
  }, [])

  const { order, loading, error } = useOrder(orderId)

  if (loading) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Skeleton variant='circular' width={40} height={40} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant='text' width={200} sx={{ mx: 'auto' }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div className='border rounded p-4'>
            <Skeleton variant='text' width='60%' />
            <Skeleton variant='text' width='40%' />
            <Skeleton variant='text' width='50%' />
          </div>
        </Grid>
        <Grid item xs={12} md={8} xl={9}>
          <div className='border rounded'>
            {[1, 2].map(item => (
              <div key={item} className='flex p-4 gap-4 [&:not(:last-child)]:border-be'>
                <Skeleton variant='rectangular' width={80} height={80} />
                <div className='flex-1'>
                  <Skeleton variant='text' width='70%' />
                  <Skeleton variant='text' width='30%' />
                  <Skeleton variant='text' width='20%' />
                </div>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <div className='border rounded p-4'>
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='60%' />
          </div>
        </Grid>
      </Grid>
    )
  }

  if (error || !order) {
    return (
      <Alert
        severity='error'
        sx={{ m: 2 }}
        action={
          <Button color='inherit' size='small' component={Link} href='/'>
            Go Home
          </Button>
        }
      >
        {error || 'Order not found'}
      </Alert>
    )
  }

  const orderTotal = order.OrderItems.reduce((sum, item) => sum + item.subtotal, 0)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex items-center flex-col text-center gap-4'>
          <Typography variant='h4'>Thank You! 😇</Typography>
          <Typography>
            Your order <span className='font-medium text-textPrimary'>#{order.orderId}</span> has been placed!
          </Typography>
          <div className='flex items-center gap-2'>
            <i className='ri-time-line text-xl text-textPrimary' />
            <Typography>Time placed: {formatDate(order.created_at)}</Typography>
          </div>
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className='flex flex-col md:flex-row border rounded'>
          <div className='flex flex-col is-full p-5 gap-4 items-center sm:items-start max-md:[&:not(:last-child)]:border-be md:[&:not(:last-child)]:border-ie'>
            <div className='flex items-center gap-2'>
              <i className='ri-map-pin-line text-xl text-textPrimary' />
              <Typography className='font-medium' color='text.primary'>
                Shipping Address
              </Typography>
            </div>
            <Typography>{order.shipping_address}</Typography>
            <Typography className='font-medium'>{order.customer_phone}</Typography>
          </div>

          <div className='flex flex-col is-full p-5 gap-4 items-center sm:items-start'>
            <div className='flex items-center gap-2'>
              <i className='ri-truck-line text-xl text-textPrimary' />
              <Typography className='font-medium' color='text.primary'>
                Order Status
              </Typography>
            </div>
            <Chip
              label={order.delivery_status}
              color={order.delivery_status === 'Processing' ? 'warning' : 'success'}
              variant='outlined'
            />
            <Chip
              label={order.payment_status}
              color={order.payment_status === 'Pending' ? 'warning' : 'success'}
              variant='outlined'
            />
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={8} xl={9}>
        <div className='border rounded'>
          {order.OrderItems.map((item, index) => {
            const itemDetails = item.product || item.service

            if (!itemDetails) return null

            return (
              <div key={index} className='flex flex-col sm:flex-row items-center [&:not(:last-child)]:border-be p-4'>
                <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                  <Image
                    src={itemDetails.images[0]}
                    alt={'name' in itemDetails ? itemDetails.name : itemDetails.title}
                    fill
                    className='object-cover rounded'
                  />
                </Box>
                <div className='flex justify-between is-full p-5 gap-4 flex-col sm:flex-row items-center sm:items-start'>
                  <div className='flex flex-col gap-2 items-center sm:items-start'>
                    <Typography className='font-medium' color='text.primary'>
                      {'name' in itemDetails ? itemDetails.name : itemDetails.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Quantity: {item.quantity}
                    </Typography>
                  </div>
                  <Typography color='primary'>${item.price.toFixed(2)}</Typography>
                </div>
              </div>
            )
          })}
        </div>
      </Grid>

      <Grid item xs={12} md={4} xl={3}>
        <div className='border rounded'>
          <CardContent>
            <div className='flex items-center justify-between gap-2'>
              <Typography className='font-medium' color='text.primary'>
                Total
              </Typography>
              <Typography className='font-medium' color='text.primary'>
                ${orderTotal.toFixed(2)}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepConfirmation
