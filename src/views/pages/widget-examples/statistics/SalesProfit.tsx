'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const seriesSales = [{ data: [0, 11, 0, 18, 5, 30] }]
const seriesProfit = [{ data: [5, 25, 0, 22, 11, 30] }]

const SalesProfit = () => {
  // Vars
  const optionsSales: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round'
    },
    grid: {
      show: false,
      padding: {
        top: -22,
        left: -6,
        right: 7,
        bottom: -11
      }
    },
    colors: ['var(--mui-palette-warning-main)'],
    markers: {
      size: 5,
      offsetY: 1,
      offsetX: -2,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 5,
          seriesIndex: 0,
          strokeColor: 'var(--mui-palette-warning-main)',
          fillColor: 'var(--mui-palette-background-paper)',
          dataPointIndex: seriesSales[0].data.length - 1
        }
      ]
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  const optionsProfit: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round'
    },
    grid: {
      show: false,
      padding: {
        top: -22,
        left: -6,
        right: 7,
        bottom: -11
      }
    },
    colors: ['var(--mui-palette-error-main)'],
    markers: {
      size: 5,
      offsetY: 1,
      offsetX: -2,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 5,
          seriesIndex: 0,
          strokeColor: 'var(--mui-palette-error-main)',
          fillColor: 'var(--mui-palette-background-paper)',
          dataPointIndex: seriesSales[0].data.length - 1
        }
      ]
    },
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
        <Grid container>
          <Grid item xs={6} className='flex flex-col gap-1'>
            <Typography variant='h5'>152k</Typography>
            <div className='flex items-center text-success'>
              <Typography variant='body2' color='success.main'>
                18.2%
              </Typography>
              <i className='ri-arrow-up-s-line text-xl'></i>
            </div>
            <Typography>Total Sales</Typography>
          </Grid>
          <Grid item xs={6}>
            <AppReactApexCharts type='line' height={84} width='100%' options={optionsSales} series={seriesSales} />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent className='pbs-5'>
        <Grid container>
          <Grid item xs={6} className='flex flex-col gap-1'>
            <Typography variant='h5'>89.5k</Typography>
            <div className='flex items-center text-error'>
              <Typography variant='body2' color='error'>
                -8%
              </Typography>
              <i className='ri-arrow-down-s-line text-xl'></i>
            </div>
            <Typography>Total Profit</Typography>
          </Grid>
          <Grid item xs={6}>
            <AppReactApexCharts type='line' height={84} width='100%' options={optionsProfit} series={seriesProfit} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SalesProfit
