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
const series = [64]

const RadialBarChart = () => {
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['var(--mui-palette-primary-main)'],
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: 'var(--mui-palette-customColors-trackBg)'
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: '0.9375rem',
            color: 'var(--mui-palette-text-primary)'
          }
        }
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  return (
    <Card>
      <CardContent className='pbe-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$67.1k</Typography>
          <Typography color='success.main'>+49%</Typography>
        </div>
        <Typography variant='subtitle1'>Overview</Typography>

        <AppReactApexCharts type='radialBar' height={124} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default RadialBarChart
