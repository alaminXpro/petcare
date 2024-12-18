'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'
import type { ApexOptions } from 'apexcharts'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

type DataType = {
  title: string
  sales: string
  trend: string
  trendNumber: string
}

// Vars
const data: DataType[] = [
  {
    sales: '$845k',
    title: 'Google Analytics',
    trendNumber: '82%',
    trend: 'down'
  },
  {
    sales: '$12.5k',
    title: 'Facebook Ads',
    trendNumber: '52%',
    trend: 'up'
  }
]

const series = [
  {
    name: 'Google Analytics',
    data: [155, 135, 320, 100, 150, 335, 160]
  },
  {
    name: 'Facebook Ads',
    data: [110, 235, 125, 230, 215, 115, 200]
  }
]

const ExternalLinks = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all'
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yaxis: { show: false },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-secondary-main)'],
    grid: {
      strokeDashArray: 10,
      borderColor: 'var(--mui-palette-divider)',
      padding: {
        top: -25,
        left: -4,
        right: -5,
        bottom: -10
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: ['var(--mui-palette-background-paper)']
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '49%'
            }
          }
        }
      },
      {
        breakpoint: 1355,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '55%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='External Links' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <CardContent className='flex flex-col gap-4 pbs-5'>
        <AppReactApexCharts type='bar' height={195} width='100%' series={series} options={options} />
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className='border-0'>
                  <td className='!pis-0 !pbe-0 !pbs-2 !bs-6'>
                    <div className='flex items-center gap-2 !pis-0'>
                      <i className='ri-circle-fill text-sm text-primary' />
                      <Typography variant='body2' color='text.primary' className='font-medium'>
                        {row.title}
                      </Typography>
                    </div>
                  </td>
                  <td className='text-end !pbe-0 !pbs-2 !bs-6'>
                    <Typography variant='body2'>{row.sales}</Typography>
                  </td>
                  <td className='!pie-0 !pbe-0 !pbs-2 !bs-6'>
                    <div className='flex gap-2 items-center justify-end !pie-0'>
                      <Typography variant='body2' color='text.primary' className='font-medium'>
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

export default ExternalLinks
