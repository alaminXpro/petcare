// MUI Imports
import AvatarGroup from '@mui/material/AvatarGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

const FinanceApp = () => {
  return (
    <Card>
      <CardMedia className='bs-[9.625rem]' image='/images/cards/iphone-bg.png' />
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex gap-4'>
              <Chip label='UI Design' variant='tonal' color='success' size='small' />
              <Chip label='React' variant='tonal' color='error' size='small' />
            </div>
            <OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} iconClassName='text-textDisabled' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Typography variant='h5'>Finance ios App</Typography>
              <Typography variant='body2' className='font-medium'>
                Due Date: 20/Dec/2022
              </Typography>
            </div>
            <Typography variant='body2'>
              Managing your money isn’t the easiest thing to do. Now that many of us no longer balance a checkbook,
              tracking and expenses.
            </Typography>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                Progress
              </Typography>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                68%
              </Typography>
            </div>
            <LinearProgress variant='determinate' value={40} color='success' className='bs-2' />
          </div>
          <div className='flex items-center justify-between'>
            <AvatarGroup total={4} className='pull-up'>
              <CustomAvatar alt='John Doe' src='/images/avatars/1.png' size={32} />
              <CustomAvatar alt='Howard Lloyd' src='/images/avatars/5.png' size={32} />
              <CustomAvatar alt='Hallie Richards' src='/images/avatars/8.png' size={32} />
              <CustomAvatar alt='Alice Cobb' src='/images/avatars/2.png' size={32} />
            </AvatarGroup>
            <div className='flex items-center gap-3'>
              <div className='flex gap-1'>
                <i className='ri-attachment-line text-textDisabled' />
                <Typography color='text.disabled' className='font-medium'>
                  24
                </Typography>
              </div>
              <div className='flex gap-1'>
                <i className='ri-checkbox-circle-line text-textDisabled' />
                <Typography color='text.disabled' className='font-medium'>
                  74/180
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FinanceApp
