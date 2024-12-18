'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [
  {
    type: 'column',
    name: 'Earning',
    data: [100, 56, 75, 50, 87, 60, 52]
  },
  {
    type: 'column',
    name: 'Expense',
    data: [-53, -29, -67, -84, -60, -40, -77]
  },
  {
    type: 'line',
    name: 'Expense',
    data: [73, 20, 50, -20, 58, 15, 25]
  }
]

const WeeklySales = () => {
  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    markers: {
      size: 4,
      strokeWidth: 3,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: 'var(--mui-palette-background-paper)',
      strokeColors: 'var(--mui-palette-warning-main)'
    },
    stroke: {
      curve: 'smooth',
      width: [0, 0, 3],
      colors: ['var(--mui-palette-warning-main)']
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-primary-lightOpacity)'],
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    legend: { show: false },
    grid: {
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -26,
        left: -14,
        right: -16,
        bottom: -8
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '13px' }
      }
    },
    yaxis: {
      max: 100,
      min: -100,
      show: false
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Sales'
        subheader='Total 85.4k Sales'
        action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
      />
      <CardContent className='flex flex-col gap-11'>
        <div className='flex gap-6'>
          <div className='flex gap-3'>
            <CustomAvatar skin='light' color='primary' variant='rounded'>
              <i className='ri-funds-line' />
            </CustomAvatar>
            <div className='flex flex-col'>
              <Typography>Net Income</Typography>
              <Typography color='text.primary' className='font-medium'>
                $438.5k
              </Typography>
            </div>
          </div>
          <div className='flex gap-3'>
            <CustomAvatar skin='light' color='warning' variant='rounded'>
              <i className='ri-money-dollar-circle-line' />
            </CustomAvatar>
            <div className='flex flex-col'>
              <Typography>Expense</Typography>
              <Typography color='text.primary' className='font-medium'>
                $22.4k
              </Typography>
            </div>
          </div>
        </div>
        <AppReactApexCharts type='line' height={213} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default WeeklySales
