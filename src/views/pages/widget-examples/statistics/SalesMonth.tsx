'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [{ data: [12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25] }]

const SalesMonth = () => {
  // Vars
  const primaryColor = 'var(--mui-palette-primary-main)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 9,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.18,
        color: primaryColor
      }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      lineCap: 'round'
    },
    colors: [primaryColor],
    grid: {
      show: false,
      padding: {
        top: -27,
        left: 7,
        right: 7,
        bottom: 9
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader title='Sales this Month' />
      <CardContent className='flex flex-col gap-4 pbe-0'>
        <div>
          <Typography>Total Sales This Month</Typography>
          <Typography variant='h5'>$28,450</Typography>
        </div>
        <AppReactApexCharts type='line' height={115} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default SalesMonth
