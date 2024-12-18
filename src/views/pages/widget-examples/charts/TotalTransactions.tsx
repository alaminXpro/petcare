'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [
  {
    name: 'Last Week',
    data: [83, 153, 213, 279, 213, 153, 83]
  },
  {
    name: 'This Week',
    data: [-84, -156, -216, -282, -216, -156, -84]
  }
]

const TotalTransactions = () => {
  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: {
      y: { formatter: val => `${Math.abs(val)}` }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-success-main)'],
    grid: {
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10,
        bottom: -25
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        barHeight: '30%',
        horizontal: true,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      }
    },
    xaxis: {
      position: 'top',
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        formatter: val => `${Math.abs(Number(val))}`,
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '13px' }
      }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={7} className='max-sm:border-be sm:border-ie'>
          <CardHeader title='Total Transactions' />
          <CardContent className='pbs-5'>
            <AppReactApexCharts type='bar' height={232} width='100%' series={series} options={options} />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={5}>
          <CardHeader
            title='Report'
            subheader='Last month transactions $234.40k'
            action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
          />
          <CardContent className='pbs-6'>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-evenly'>
                <div className='flex flex-col gap-3 items-center'>
                  <CustomAvatar skin='light' color='success' variant='rounded'>
                    <i className='ri-pie-chart-2-line' />
                  </CustomAvatar>
                  <div className='flex flex-col items-center gap-0.5'>
                    <Typography>This Week</Typography>
                    <Typography color='text.primary' className='font-medium'>
                      +82.45%
                    </Typography>
                  </div>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className='flex flex-col gap-3 items-center'>
                  <CustomAvatar skin='light' color='primary' variant='rounded'>
                    <i className='ri-money-dollar-circle-line' />
                  </CustomAvatar>
                  <div className='flex flex-col items-center gap-0.5'>
                    <Typography>Last Week</Typography>
                    <Typography color='text.primary' className='font-medium'>
                      -24.86%
                    </Typography>
                  </div>
                </div>
              </div>
              <Divider />
              <div className='flex flex-wrap gap-3 items-center justify-around '>
                <div className='flex flex-col items-center gap-0.5'>
                  <Typography>Performance</Typography>
                  <Typography color='text.primary' className='font-medium'>
                    +94.15%
                  </Typography>
                </div>
                <div>
                  <Button variant='contained'>View Report</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default TotalTransactions
