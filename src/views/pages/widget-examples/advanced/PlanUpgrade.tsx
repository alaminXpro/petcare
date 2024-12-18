'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { SystemMode } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

type DataType = {
  avatarSrc: string
  imageWidth: number
  title: string
  cardNumber: string
  alt: string
}

// Vars
const data: DataType[] = [
  {
    avatarSrc: '/images/logos/mastercard.png',
    imageWidth: 30,
    title: 'Credit Card',
    cardNumber: '2566 xxxx xxxx 8908',
    alt: 'master-card'
  },
  {
    avatarSrc: '/images/logos/dinners-club.png',
    imageWidth: 25,
    title: 'Credit Card',
    cardNumber: '8990 xxxx xxxx 6852',
    alt: 'credit-card'
  }
]

const PlanUpgrade = ({ serverMode }: { serverMode: SystemMode }) => {
  // Hooks
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  return (
    <Card>
      <CardHeader
        title='Upgrade Your Plan'
        action={<OptionMenu options={['Add Cards', 'Edit Cards', 'Delete Year']} />}
      />
      <CardContent className='flex flex-col gap-[13px]'>
        <Typography variant='body2'>
          Please make the payment to start enjoying all the features of our premium plan as soon as possible.
        </Typography>
        <div className='flex items-center gap-4 p-4 bg-primaryLight rounded'>
          <CustomAvatar skin='light' variant='rounded' className='border border-primary bg-transparent' size={40}>
            <i className='ri-trophy-line text-primary text-[24px]' />
          </CustomAvatar>
          <div className='flex items-center is-full justify-between'>
            <div className='flex flex-col gap-0.5'>
              <Typography color='text.primary' className='font-medium'>
                Platinum
              </Typography>
              <Typography variant='body2' color='primary'>
                Upgrade Plan
              </Typography>
            </div>
            <div className='flex items-baseline'>
              <Typography component='sup' variant='body2' color='text.primary' className='self-start'>
                $
              </Typography>
              <Typography variant='h4'>5,250</Typography>
              <Typography component='sub' variant='body2' color='text.primary' className='self-baseline'>
                /Year
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Typography color='text.primary' className='font-medium'>
            Payment details
          </Typography>
          {data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <Avatar
                variant='rounded'
                className={classnames('bg-actionHover is-[42px] bs-[30px]', {
                  'bg-white': _mode === 'dark',
                  'bg-actionHover': _mode === 'light'
                })}
              >
                <img src={item.avatarSrc} alt={item.alt} width={item.imageWidth} />
              </Avatar>

              <div className='flex items-center justify-between is-full flex-wrap gap-x-4 gap-y-2'>
                <div className='flex flex-col'>
                  <Typography color='text.primary' className='font-medium'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.cardNumber}</Typography>
                </div>
                <TextField name='cvv' label='CVV' size='small' className='is-20' />
              </div>
            </div>
          ))}
          <Typography variant='body2' component={Link} href='/' color='primary' onClick={e => e.preventDefault()}>
            Add Payment Method
          </Typography>
        </div>
        <TextField fullWidth name='email' placeholder='john.doe@gmail.com' size='small' />
        <Button variant='contained' color='primary' fullWidth>
          Contact Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlanUpgrade
