'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [{ name: 'Avarage cost per interaction is $5.65', data: [7, 65, 40, 7, 40, 80, 45, 65, 65] }]

const PerformanceOverview = () => {
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'stepline'
    },
    colors: ['var(--mui-palette-warning-main)'],
    grid: {
      yaxis: {
        lines: { show: false }
      },
      padding: {
        left: -7,
        right: 3
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    responsive: [
      {
        breakpoint: 1051,
        options: {
          chart: {
            height: 229
          },
          grid: {
            padding: {
              top: -20
            }
          }
        }
      },
      {
        breakpoint: 704,
        options: {
          chart: {
            height: 207
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Performance Overview'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <AppReactApexCharts type='line' height={202} width='100%' options={options} series={series} />
        <div className='flex items-center justify-center gap-1.5 mbs-6'>
          <i className='ri-checkbox-blank-circle-fill text-warning text-[10px]' />
          <Typography color='text.disabled'>Average cost per interaction is $5.65</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default PerformanceOverview
