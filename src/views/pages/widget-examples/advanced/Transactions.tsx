// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

type DataType = {
  title: string
  subtitle: string
  amount: string
  transaction: 'credit' | 'debit'
  avatarColor: ThemeColor
  avatarIcon: string
}

// Vars
const data: DataType[] = [
  {
    title: 'Credit Card',
    subtitle: 'Digital Ocean',
    amount: '-$850',
    transaction: 'debit',
    avatarColor: 'success',
    avatarIcon: 'ri-bank-card-line'
  },
  {
    title: 'Paypal',
    subtitle: 'Received Money',
    amount: '+$34,456',
    transaction: 'credit',
    avatarColor: 'primary',
    avatarIcon: 'ri-paypal-line'
  },
  {
    title: 'Mastercard',
    subtitle: 'Netflix',
    amount: '-$199',
    transaction: 'debit',
    avatarColor: 'info',
    avatarIcon: 'ri-mastercard-line'
  },
  {
    title: 'Wallet',
    subtitle: `Mac'D`,
    amount: '-$156',
    transaction: 'debit',
    avatarColor: 'error',
    avatarIcon: 'ri-wallet-3-line'
  },
  {
    title: 'Paypal',
    subtitle: 'Received Money',
    amount: '+$12.872',
    transaction: 'credit',
    avatarColor: 'primary',
    avatarIcon: 'ri-paypal-line'
  },
  {
    title: 'Stripe',
    subtitle: 'Buy Apple Watch',
    amount: '-$299',
    transaction: 'debit',
    avatarColor: 'warning',
    avatarIcon: 'ri-bank-card-2-line'
  }
]

const Transactions = () => {
  return (
    <Card>
      <CardHeader title='Transactions' action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />} />
      <CardContent className='flex flex-col gap-6'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={40}>
              <i className={classnames(item.avatarIcon, 'text-[24px]')} />
            </CustomAvatar>
            <div className='flex flex-wrap justify-between items-center gap-x-2 gap-y-1 is-full'>
              <div className='flex flex-col gap-0.5'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography>{item.subtitle}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <Typography color='text.primary' className='font-medium'>
                  {item.amount}
                </Typography>
                <i
                  className={classnames(
                    item.transaction === 'debit' ? 'ri-arrow-down-s-line text-error' : 'ri-arrow-up-s-line text-success'
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Transactions
