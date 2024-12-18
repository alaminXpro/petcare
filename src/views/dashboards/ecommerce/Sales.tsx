// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Type Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Types
type DataType = {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

// Vars
const data: DataType[] = [
  {
    stats: '8,458',
    color: 'primary',
    title: 'Customers',
    icon: 'ri-user-star-line'
  },
  {
    stats: '$28.5k',
    color: 'warning',
    icon: 'ri-pie-chart-2-line',
    title: 'Total Profit'
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Transactions',
    icon: 'ri-arrow-left-right-line'
  }
]

const Sales = () => {
  return (
    <Card className='bs-full'>
      <CardHeader
        title='Sales Overview'
        action={<OptionMenu options={['Refresh', 'Share', 'Update']} />}
        subheader={
          <div className='flex items-center gap-2'>
            <span>Total 42.5k Sales</span>
            <span className='flex items-center text-success font-medium'>
              +18%
              <i className='ri-arrow-up-s-line text-xl' />
            </span>
          </div>
        }
      />
      <CardContent>
        <div className='flex flex-wrap justify-between gap-4'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <CustomAvatar variant='rounded' skin='light' color={item.color}>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography>{item.title}</Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Sales
