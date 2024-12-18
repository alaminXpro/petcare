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
const series = [35, 30, 23]

const DonutChart = () => {
  const options: ApexOptions = {
    legend: { show: false },
    stroke: { width: 5, colors: ['var(--mui-palette-background-paper)'] },
    grid: {
      padding: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 13
      }
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-success-main)', 'var(--mui-palette-secondary-main)'],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: {
      y: { formatter: (val: number) => `${val}%` }
    },
    dataLabels: {
      enabled: false
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
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: false },
            total: {
              label: '',
              show: true,
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--mui-palette-text-secondary)',
              formatter: val => (typeof val === 'string' ? `${val}%` : '12%')
            },
            value: {
              offsetY: 6,
              fontWeight: 600,
              fontSize: '0.9375rem',
              formatter: val => `${val}%`,
              color: 'var(--mui-palette-text-primary)'
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardContent className='pbe-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$27.9k</Typography>
          <Typography color='success.main'>+16%</Typography>
        </div>
        <Typography variant='subtitle1'>Total Growth</Typography>
        <AppReactApexCharts type='donut' height={127} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default DonutChart
