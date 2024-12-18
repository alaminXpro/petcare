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

const series = [
  {
    name: 'Sales',
    data: [24165, 18850, 16375, 13567, 8800]
  }
]

const CardWidgetsSalesCountry = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '59%',
        horizontal: true,
        distributed: true,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      offsetY: 8,
      style: {
        fontWeight: 500,
        fontSize: '0.8125rem'
      }
    },
    grid: {
      strokeDashArray: 8,
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -30,
        left: 21,
        right: 25,
        bottom: -5
      }
    },
    colors: [
      'var(--mui-palette-primary-main)',
      'var(--mui-palette-success-main)',
      'var(--mui-palette-warning-main)',
      'var(--mui-palette-info-main)',
      'var(--mui-palette-error-main)'
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['US', 'IN', 'JA', 'CA', 'AU'],
      labels: {
        formatter: val => `${Number(val) / 1000}k`,
        style: {
          fontSize: '0.8125rem',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontWeight: 500,
          fontSize: '0.9375rem',
          colors: 'var(--mui-palette-text-primary)'
        },
        offsetX: theme.direction === 'rtl' ? -15 : -30
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Sales Country'
        subheader='Total $42,580 Sales'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='pbs-4'>
        <AppReactApexCharts type='bar' height={263} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default CardWidgetsSalesCountry
