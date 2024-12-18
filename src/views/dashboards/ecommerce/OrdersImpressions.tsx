// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const OrdersImpressions = () => {
  return (
    <Card className='flex flex-col justify-evenly bs-full'>
      <CardContent className='flex items-center gap-4'>
        <div className='relative flex items-center justify-center'>
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
          <i className='ri-macbook-line text-primary absolute' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-wrap items-center gap-1'>
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
      <CardContent className='flex items-center gap-4'>
        <div className='relative flex items-center justify-center'>
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
          <i className='ri-handbag-line text-warning absolute' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-wrap items-center gap-1'>
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
