'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
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
    type: 'column',
    data: [85, 68, 56, 65, 65, 50, 39]
  },
  {
    type: 'line',
    name: 'Sales',
    data: [63, 38, 31, 45, 46, 27, 18]
  }
]

const WeeklyOverview = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '27%',
        colors: {
          ranges: [
            {
              to: 50,
              from: 40,
              color: 'var(--mui-palette-primary-main)'
            }
          ]
        }
      }
    },
    markers: {
      size: 3.5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: 'var(--mui-palette-background-paper)',
      strokeColors: 'var(--mui-palette-primary-main)'
    },
    stroke: {
      width: [0, 2],
      colors: ['var(--mui-palette-customColors-trackBg)', 'var(--mui-palette-primary-main)']
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: ['var(--mui-palette-customColors-trackBg)'],
    grid: {
      strokeDashArray: 7,
      borderColor: 'var(--mui-palette-divider)'
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      max: 90,
      show: true,
      tickAmount: 3,
      labels: {
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`,
        style: {
          fontSize: '0.8125rem',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '31%'
            }
          }
        }
      },
      {
        breakpoint: 1445,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 1150,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '20%',
              borderRadius: 10
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%',
              borderRadius: 8
            }
          }
        }
      },
      {
        breakpoint: 415,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='Weekly Overview' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <CardContent>
        <AppReactApexCharts type='line' height={232} width='100%' series={series} options={options} />
        <div className='flex flex-col justify-center gap-6 mbs-6'>
          <div className='flex gap-4'>
            <Typography variant='h4'>62%</Typography>
            <Typography>Your sales performance is 45% 😎 better compared to last month</Typography>
          </div>
          <Button variant='contained' color='primary'>
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
