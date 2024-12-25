'use client'

import { Box, Button, Typography, CardContent, Grid, Divider } from '@mui/material'

import { useCart } from '@/redux-store/hooks/useCart'

interface Props {
  handleNext: () => void
}

export default function StepCart({ handleNext }: Props) {
  const { items, total, itemsCount } = useCart()

  if (itemsCount === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 5 }}>
        <Typography variant='h6'>Your cart is empty</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography variant='h5' sx={{ mb: 4 }}>
          My Shopping Bag ({itemsCount} Items)
        </Typography>
        <div className='border rounded'>
          {items.map((item, index) => (
            <div key={index} className='flex flex-row items-center justify-between p-4 [&:not(:last-child)]:border-b'>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  {item.type === 'product' ? 'Product' : 'Service'}
                </Typography>
                <Typography variant='subtitle1'>{item.name}</Typography>
              </div>
              <div className='text-right'>
                <Typography variant='body2'>Qty: {item.quantity}</Typography>
                <Typography variant='subtitle2' color='primary'>
                  ${item.price}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} lg={4}>
        <div className='border rounded'>
          <CardContent className='flex gap-4 flex-col'>
            <Typography variant='h6'>Price Details</Typography>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <Typography>Items ({itemsCount})</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </div>
              <Divider />
              <div className='flex items-center justify-between'>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
        <Button fullWidth variant='contained' onClick={handleNext} sx={{ mt: 4 }} disabled={itemsCount === 0}>
          Place Order
        </Button>
      </Grid>
    </Grid>
  )
}
