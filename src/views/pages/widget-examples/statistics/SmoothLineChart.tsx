'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [{ data: [0, 30, 10, 70, 40, 110, 95] }]

const SmoothLineChart = () => {
  // Vars
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 4,
      curve: 'smooth',
      lineCap: 'round'
    },
    grid: {
      show: false,
      padding: {
        top: -32,
        left: 0,
        right: 10,
        bottom: -10
      }
    },
    colors: ['var(--mui-palette-warning-main)'],
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  return (
    <Card>
      <CardContent>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$22.6k</Typography>
          <Typography color='success.main'>+38%</Typography>
        </div>
        <Typography variant='subtitle1'>Total Sales</Typography>
      </CardContent>
      <CardContent>
        <AppReactApexCharts type='line' height={84} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default SmoothLineChart
