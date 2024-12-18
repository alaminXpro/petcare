'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  {
    name: 'Earning',
    data: [120, 200, 150, 120]
  },
  {
    name: 'Expense',
    data: [72, 120, 50, 65]
  }
]

const BarChart = () => {
  // Hooks
  const theme = useTheme()

  // Vars
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -30,
        left: -14,
        right: -4,
        bottom: -12
      },
      yaxis: {
        lines: { show: false }
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-warning-main)'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '48%',
        borderRadiusApplication: 'end'
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
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr']
    },
    yaxis: {
      labels: { show: false }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { borderRadius: 4 }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '40%', borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: 735,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '28%', borderRadius: 7 }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '37%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$42.5k</Typography>
          <Typography color='error'>-22%</Typography>
        </div>
        <Typography variant='subtitle1'>Total Revenue</Typography>
      </CardContent>
      <CardContent>
        <AppReactApexCharts type='bar' height={84} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default BarChart
