'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const OrganicSessions = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      'var(--mui-palette-warning-main)',
      'rgba(var(--mui-palette-warning-mainChannel) / 0.8)',
      'rgba(var(--mui-palette-warning-mainChannel) / 0.6)',
      'rgba(var(--mui-palette-warning-mainChannel) / 0.4)',
      'rgba(var(--mui-palette-warning-mainChannel) / 0.2)'
    ],
    grid: {
      padding: {
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '15px',
      offsetY: 5,
      itemMargin: {
        horizontal: 28,
        vertical: 6
      },
      labels: {
        colors: 'var(--mui-palette-text-secondary)'
      },
      markers: {
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 4 : -1,
        width: 10,
        height: 10
      }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 4, lineCap: 'round', colors: ['var(--mui-palette-background-paper)'] },
    labels: ['USA', 'India', 'Canada', 'Japan', 'France'],
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
        endAngle: 130,
        startAngle: -130,
        customScale: 0.9,
        donut: {
          size: '83%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              fontSize: '0.9375rem',
              color: 'var(--mui-palette-text-secondary)'
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.75rem',
              formatter: value => `${value}k`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              label: '2022',
              fontSize: '1rem',
              color: 'var(--mui-palette-text-secondary)',
              formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}k`
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Organic Sessions'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <AppReactApexCharts type='donut' height={373} width='100%' options={options} series={[13, 18, 18, 24, 16]} />
      </CardContent>
    </Card>
  )
}

export default OrganicSessions
