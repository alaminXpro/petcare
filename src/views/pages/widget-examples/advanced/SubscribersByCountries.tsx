// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type DataType = {
  country: string
  imgAlt: string
  imgSrc: string
  subscribers: string
  percent: string
  trend: 'up' | 'down'
}

// Vars
const data: DataType[] = [
  {
    country: 'USA',
    imgAlt: 'USA',
    imgSrc: '/images/cards/us.png',
    subscribers: '22,450',
    percent: '+22.5%',
    trend: 'up'
  },
  {
    country: 'India',
    imgAlt: 'India',
    imgSrc: '/images/cards/india.png',
    subscribers: '28,568',
    percent: '+28.5%',
    trend: 'up'
  },
  {
    country: 'Brazil',
    imgAlt: 'Brazil',
    imgSrc: '/images/cards/brazil.png',
    subscribers: '8,457',
    percent: '-8.3%',
    trend: 'down'
  },
  {
    country: 'Australia',
    imgAlt: 'Australia',
    imgSrc: '/images/cards/australia.png',
    subscribers: '2,850',
    percent: '+15.2%',
    trend: 'up'
  },
  {
    country: 'France',
    imgAlt: 'France',
    imgSrc: '/images/cards/france.png',
    subscribers: '1,930',
    percent: '-12.6%',
    trend: 'down'
  },
  {
    country: 'China',
    imgAlt: 'China',
    imgSrc: '/images/cards/china.png',
    subscribers: '852',
    percent: '-2.4%',
    trend: 'down'
  }
]

const PaymentHistory = () => {
  return (
    <Card>
      <CardHeader
        title='Subscribers by Countries'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <div className='overflow-x-auto pbe-1'>
        <table className={tableStyles.table}>
          <thead className='uppercase'>
            <tr className='border-be'>
              <th className='bg-transparent font-normal bs-[2.875rem]'>Countries</th>
              <th className='bg-transparent text-center font-normal bs-[2.875rem]'>subscribers</th>
              <th className='bg-transparent text-end font-normal bs-[2.875rem]'>percent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className='border-0'>
                <td className='!pbe-[22px]'>
                  <div className='flex items-center gap-4'>
                    <img width={30} height={30} alt={row.imgAlt} src={row.imgSrc} />
                    <Typography color='text.primary' className='font-medium'>
                      {row.country}
                    </Typography>
                  </div>
                </td>
                <td align='center' className='!pbe-[22px]'>
                  <Typography className='font-medium'>{row.subscribers}</Typography>
                </td>
                <td className='!pbe-[22px] text-end'>
                  <div className='flex items-center justify-end gap-1'>
                    <Typography color={row.trend === 'down' ? 'error.main' : 'success.main'} className='font-medium'>
                      {row.percent}
                    </Typography>
                    <i
                      className={classnames(
                        row.trend === 'down' ? 'ri-arrow-down-s-line text-error ' : 'ri-arrow-up-s-line text-success'
                      )}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default PaymentHistory
