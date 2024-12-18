'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Components
const LinearProgress = styled(MuiLinearProgress)(() => ({
  '&.MuiLinearProgress-colorWarning': { backgroundColor: 'var(--mui-palette-primary-main)' },
  '& .MuiLinearProgress-bar': {
    borderStartEndRadius: 0,
    borderEndEndRadius: 0
  }
}))

const TotalVisits = () => {
  return (
    <Card className='flex flex-col justify-between bs-full'>
      <CardContent className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <Typography>Total Visits</Typography>
          <Typography variant='h4'>42.5k</Typography>
        </div>
        <div className='flex items-center text-success'>
          <Typography color='success.main'>+18.2%</Typography>
          <i className='ri-arrow-up-s-line text-xl'></i>
        </div>
      </CardContent>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-x-2'>
              <CustomAvatar size={24} variant='rounded' skin='light' className='rounded-md' color='warning'>
                <i className='ri-pie-chart-2-line text-base' />
              </CustomAvatar>
              <Typography>Order</Typography>
            </div>
            <Typography variant='h4'>23.5%</Typography>
            <Typography>2,890</Typography>
          </div>
          <Divider flexItem orientation='vertical' sx={{ '& .MuiDivider-wrapper': { p: 0, py: 2 } }}>
            <CustomAvatar skin='light' color='secondary' size={28} className='bg-actionSelected'>
              <Typography variant='body2'>VS</Typography>
            </CustomAvatar>
          </Divider>
          <div className='flex flex-col items-end gap-2'>
            <div className='flex items-center gap-x-2'>
              <Typography>Visits</Typography>
              <CustomAvatar size={24} variant='rounded' skin='light' className='rounded-md' color='primary'>
                <i className='ri-mac-line text-base' />
              </CustomAvatar>
            </div>
            <Typography variant='h4'>23.5%</Typography>
            <Typography>2,890</Typography>
          </div>
        </div>
        <LinearProgress value={26} color='warning' variant='determinate' className='bs-2' />
      </CardContent>
    </Card>
  )
}

export default TotalVisits
