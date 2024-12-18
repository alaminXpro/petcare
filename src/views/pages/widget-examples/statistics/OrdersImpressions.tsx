'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'

// Third-party Components
import classnames from 'classnames'

const OrdersImpressions = () => {
  // Hooks
  const theme = useTheme()

  return (
    <Card>
      <CardContent className='flex items-center gap-4  plb-[30px]'>
        <div className='flex relative'>
          <CircularProgress
            variant='determinate'
            size={64}
            value={100}
            thickness={5}
            className='absolute text-track'
            sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4 } }}
          />
          <CircularProgress
            variant='determinate'
            size={64}
            value={65}
            thickness={5}
            sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
          />
          <i
            className={classnames('ri-macbook-line text-primary absolute top-1/2 end-1/2 -translate-y-1/2', {
              '-translate-x-1/2': theme.direction === 'rtl',
              'translate-x-1/2': theme.direction !== 'rtl'
            })}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <Typography variant='h5'>84k</Typography>
            <div className='flex items-center text-error'>
              <Typography variant='body2' color='error'>
                -24%
              </Typography>
              <i className='ri-arrow-down-s-line text-xl'></i>
            </div>
          </div>
          <Typography>Total Impressions</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardContent className='flex items-center gap-4 plb-[30px]'>
        <div className='flex relative'>
          <CircularProgress
            variant='determinate'
            size={64}
            value={100}
            thickness={5}
            className='absolute text-track'
            sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4 } }}
          />
          <CircularProgress
            variant='determinate'
            color='warning'
            size={64}
            value={42}
            thickness={5}
            sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
          />
          <i
            className={classnames('ri-handbag-line text-warning absolute top-1/2 end-1/2 -translate-y-1/2', {
              '-translate-x-1/2': theme.direction === 'rtl',
              'translate-x-1/2': theme.direction !== 'rtl'
            })}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <Typography variant='h5'>22k</Typography>
            <div className='flex items-center text-success'>
              <Typography variant='body2' color='success.main'>
                +15%
              </Typography>
              <i className='ri-arrow-up-s-line text-xl'></i>
            </div>
          </div>
          <Typography>Total Orders</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrdersImpressions
