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
    data: [44, 24, 56, 34, 47]
  },
  {
    name: 'Expense',
    data: [-27, -21, -31, -25, -31]
  }
]

const StackedBarChart = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        enabled: false
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: ['var(--mui-palette-text-primary)', 'var(--mui-palette-error-main)'],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '65%',
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all'
      }
    },
    grid: {
      padding: {
        top: -35,
        left: -30,
        right: -18,
        bottom: -25
      },
      yaxis: {
        lines: { show: false }
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
      crosshairs: { opacity: 0 },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: { borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: '90%', borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: 1201,
        options: {
          plotOptions: {
            bar: { columnWidth: '75%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 1100,
        options: {
          plotOptions: {
            bar: { columnWidth: '80%' }
          }
        }
      },
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: { borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '65%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 800,
        options: {
          plotOptions: {
            bar: { columnWidth: '75%' }
          }
        }
      },
      {
        breakpoint: 700,
        options: {
          plotOptions: {
            bar: { columnWidth: '90%', borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: {
            height: 124
          },
          plotOptions: {
            bar: { columnWidth: '27%', borderRadius: 9 }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '32%', borderRadius: 8 }
          }
        }
      }
    ]
  }

  return (
    <Card className='bs-full flex flex-col'>
      <CardContent>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$88.5k</Typography>
          <Typography color='error'>-18%</Typography>
        </div>
        <Typography variant='subtitle1'>Total Profit</Typography>
      </CardContent>
      <CardContent className='flex flex-grow items-center'>
        <AppReactApexCharts type='bar' height={84} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default StackedBarChart
