// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

type DataType = {
  country: string
  sales: string
  trend: string
  trendNumber: string
}

// Vars
const data: DataType[] = [
  {
    country: 'Australia',
    sales: '18,879',
    trendNumber: '15%',
    trend: 'down'
  },
  {
    country: 'Canada',
    sales: '10,357',
    trendNumber: '85%',
    trend: 'up'
  },
  {
    country: 'India',
    sales: '4,860',
    trendNumber: '88%',
    trend: 'up'
  },
  {
    country: 'US',
    sales: '899',
    trendNumber: '16%',
    trend: 'down'
  },
  {
    country: 'Japan',
    sales: '43',
    trendNumber: '35%',
    trend: 'down'
  },
  {
    country: 'Brazil',
    sales: '18',
    trendNumber: '12%',
    trend: 'up'
  }
]

const SalesInCountries = () => {
  return (
    <Card>
      <CardHeader
        title='Most Sales in Countries'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='flex flex-col gap-5 pbe-0'>
        <div>
          <div className='flex items-center gap-2'>
            <Typography variant='h1'>$24,895</Typography>
            <Chip variant='tonal' color='success' label='+42%' size='small' />
          </div>
          <Typography>Sales Last 90 Days</Typography>
        </div>
        <div>
          <table className={tableStyles.table}>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className='first:border-bs'>
                  <td className='!pis-0'>
                    <Typography color='text.primary'>{row.country}</Typography>
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
                          row.trend === 'up' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
                          row.trend === 'up' ? 'text-success' : 'text-error'
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

export default SalesInCountries
