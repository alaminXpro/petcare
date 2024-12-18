// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

type DataType = {
  title: string
  sales: string
  trend: string
  color: ThemeColor
  trendNumber: string
}

// Vars
const data: DataType[] = [
  {
    sales: '$54,234',
    title: 'Profit',
    color: 'primary',
    trendNumber: '+42%',
    trend: 'up'
  },
  {
    sales: '8,657',
    title: 'Sales',
    color: 'warning',
    trendNumber: '+42%',
    trend: 'up'
  },
  {
    sales: '16,456',
    color: 'info',
    title: 'User',
    trendNumber: '-12%',
    trend: 'down'
  }
]

const SocialNetworkVisits = () => {
  return (
    <Card className='max-lg:bs-full'>
      <CardHeader
        title='General Statistics'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='flex flex-col gap-8 pbs-0.5 pbe-2'>
        <div className='flex items-center gap-4'>
          <CustomAvatar skin='light' variant='rounded' color='primary' size={50}>
            <i className='ri-bank-card-line text-[24px]' />
          </CustomAvatar>
          <div>
            <Typography variant='h3'>$89,522</Typography>
            <Typography>Last 6 Month Profit </Typography>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1 plb-4'>
            <Typography color='text.primary' className='font-medium'>
              Current Activity
            </Typography>
            <LinearProgress variant='determinate' value={25} color='primary' />
          </div>
          <table className={tableStyles.table}>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className='!pis-0'>
                    <div className='flex items-center gap-3 !pis-0'>
                      <i className={classnames('ri-circle-fill text-sm', `text-${row.color}`)} />
                      <Typography color='text.primary'>{row.title}</Typography>
                    </div>
                  </td>
                  <td className='text-end'>
                    <Typography color='text.primary' className='font-medium'>
                      {row.sales}
                    </Typography>
                  </td>
                  <td className='!pie-0'>
                    <div className='flex gap-2 items-center justify-end !pie-0'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.trendNumber}
                      </Typography>
                      <i
                        className={classnames(
                          row.trend === 'up' ? 'ri-arrow-up-s-line text-success' : 'ri-arrow-down-s-line text-error'
                        )}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default SocialNetworkVisits
