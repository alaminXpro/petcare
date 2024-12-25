'use client'

// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'

// Add new import for loading button
import { LoadingButton } from '@mui/lab'

// Component Imports
import { toast } from 'sonner'

import CustomTabList from '@core/components/mui/TabList'
import { useCart } from '@/redux-store/hooks/useCart'
import { createOrder } from '@/app/actions/order'

interface Props {
  handleNext: () => void
}

const StepPayment = ({ handleNext }: Props) => {
  // Add new state for address
  const [addressData, setAddressData] = useState<{
    phone: string
    address: string
    notes: string
  } | null>(null)

  const { items, total } = useCart()

  const [value, setValue] = useState<string>('credit-card')
  const [openCollapse, setOpenCollapse] = useState<boolean>(true)
  const [openFade, setOpenFade] = useState<boolean>(true)

  // Add loading state
  const [isLoading, setIsLoading] = useState(false)

  // Add validation check
  const isCartEmpty = items.length === 0

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    // Load address data from session storage
    const savedAddress = sessionStorage.getItem('checkoutAddress')

    if (savedAddress) {
      setAddressData(JSON.parse(savedAddress))
    }
  }, [])

  useEffect(() => {
    if (!openFade) {
      setTimeout(() => {
        setOpenCollapse(false)
      }, 300)
    }
  }, [openFade])

  const handleCheckout = async () => {
    try {
      // Prevent checkout if cart is empty
      if (isCartEmpty) {
        toast.error('Your cart is empty')

        return
      }

      setIsLoading(true) // Start loading

      // Get address data from session storage
      const addressData = JSON.parse(sessionStorage.getItem('checkoutAddress') || '{}')

      const orderItems = items.map(item => ({
        type: item.type,
        id: item.type === 'product' ? item.productId! : item.serviceId!,
        quantity: item.quantity,
        price: item.price
      }))

      const result = await createOrder({
        customer_phone: addressData.phone,
        shipping_address: addressData.address,
        order_notes: addressData.notes,
        items: orderItems
      })

      if (result.success) {
        // Store order ID for confirmation
        sessionStorage.setItem('orderId', result.order.orderId)
        handleNext()
      } else {
        toast.error(result.message || 'Failed to create order')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} className='flex flex-col gap-5'>
        <Collapse in={openCollapse}>
          <Fade in={openFade} timeout={{ exit: 300 }}>
            <Alert
              icon={<i className='ri-percent-line' />}
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setOpenFade(false)
                  }}
                >
                  <i className='ri-close-line' />
                </IconButton>
              }
            >
              <AlertTitle>Available Offers</AlertTitle>
              <Typography color='success.main'>
                - 10% Instant Discount on Bank of America Corp Bank Debit and Credit cards
              </Typography>
              <Typography color='success.main'>
                - 25% Cashback Voucher of up to $60 on first ever PayPal transaction. TCA
              </Typography>
            </Alert>
          </Fade>
        </Collapse>
        <TabContext value={value}>
          <CustomTabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='customized tabs example'
            pill='true'
          >
            <Tab value='credit-card' label='Card' />
            <Tab value='cash-on-delivery' label='Cash On Delivery' />
            <Tab value='gift-card' label='Gift Card' />
          </CustomTabList>
          <Grid container>
            <Grid item md={8} xs={12}>
              <TabPanel value='credit-card' className='p-0'>
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField fullWidth type='number' label='Card Number' placeholder='0000 0000 0000 0000' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Name' placeholder='John Doe' />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField fullWidth label='Expiry Date' placeholder='MM/YY' />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField fullWidth label='CVV' placeholder='123' />
                    </Grid>
                    <Grid item xs={12} className='pbs-4'>
                      <FormControlLabel control={<Switch defaultChecked />} label='Save Card for future billing?' />
                    </Grid>
                    <Grid item xs={12} className='flex gap-4 pbs-4'>
                      <LoadingButton
                        loading={isLoading}
                        variant='contained'
                        onClick={handleCheckout}
                        disabled={isCartEmpty}
                      >
                        Checkout
                      </LoadingButton>
                      <Button type='reset' variant='outlined' color='secondary' disabled={isCartEmpty || isLoading}>
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </TabPanel>
              <TabPanel value='cash-on-delivery'>
                <Typography className='mbe-4' color='text.primary'>
                  Cash on Delivery is a type of payment method where the recipient make payment for the order at the
                  time of delivery rather than in advance.
                </Typography>
                <LoadingButton loading={isLoading} variant='contained' onClick={handleCheckout} disabled={isCartEmpty}>
                  Pay On Delivery
                </LoadingButton>
              </TabPanel>
              <TabPanel value='gift-card'>
                <Typography className='mbe-4' color='text.primary'>
                  Enter Gift Card Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth type='number' label='Gift Card Number' placeholder='Gift Card Number' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type='number' label='Gift Card Pin' placeholder='Gift Card Pin' />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={isLoading}
                      variant='contained'
                      onClick={handleCheckout}
                      disabled={isCartEmpty}
                    >
                      Redeem Gift Card
                    </LoadingButton>
                  </Grid>
                </Grid>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
      <Grid item xs={12} lg={4}>
        <div className='border rounded'>
          <CardContent className='flex flex-col gap-4'>
            <Typography className='font-medium' color='text.primary'>
              Price Details
            </Typography>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <Typography color='text.primary'>Order Total ({items.length} items)</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </div>
            </div>
          </CardContent>
          <Divider />
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <Typography className='font-medium' color='text.primary'>
                  Total
                </Typography>
                <Typography className='font-medium'>${total.toFixed(2)}</Typography>
              </div>
            </div>
            {addressData && (
              <div>
                <Typography className='font-medium' color='text.primary' sx={{ mb: 1 }}>
                  Delivery Address:
                </Typography>
                <Typography>{addressData.address}</Typography>
                <Typography>Phone: {addressData.phone}</Typography>
                {addressData.notes && (
                  <Typography color='text.secondary' sx={{ mt: 1 }}>
                    Notes: {addressData.notes}
                  </Typography>
                )}
              </div>
            )}
          </CardContent>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPayment
