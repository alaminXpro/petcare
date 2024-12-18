'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const labels = ['Development Apps', 'UI Design', 'IOS Application', 'Web App Wireframing', 'Prototyping']

const series = [
  {
    data: [
      {
        x: 'Jaqueline',
        y: [
          new Date(`${new Date().getFullYear()}-02-01`).getTime(),
          new Date(`${new Date().getFullYear()}-05-02`).getTime()
        ]
      },
      {
        x: 'Janelle',
        y: [
          new Date(`${new Date().getFullYear()}-03-18`).getTime(),
          new Date(`${new Date().getFullYear()}-07-2`).getTime()
        ]
      },
      {
        x: 'Wellington',
        y: [
          new Date(`${new Date().getFullYear()}-03-10`).getTime(),
          new Date(`${new Date().getFullYear()}-06-2`).getTime()
        ]
      },
      {
        x: 'Blake',
        y: [
          new Date(`${new Date().getFullYear()}-02-14`).getTime(),
          new Date(`${new Date().getFullYear()}-08-1`).getTime()
        ]
      },
      {
        x: 'Quinn',
        y: [
          new Date(`${new Date().getFullYear()}-05-01`).getTime(),
          new Date(`${new Date().getFullYear()}-08-1`).getTime()
        ]
      }
    ]
  }
]

const ProjectTimeline = () => {
  // Hookss
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 10,
        distributed: true,
        barHeight: 26
      }
    },
    stroke: {
      width: 2,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: [
      'var(--mui-palette-primary-main)',
      'var(--mui-palette-success-main)',
      'var(--mui-palette-secondary-main)',
      'var(--mui-palette-info-main)',
      'var(--mui-palette-warning-main)'
    ],
    dataLabels: {
      enabled: true,
      style: { fontSize: '0.8125rem', fontWeight: 500 },
      formatter: (val, opts) => labels[opts.dataPointIndex],
      offsetY: 5
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 6,
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -2,
        left: theme.direction === 'rtl' ? 7 : -10,
        right: -5,
        bottom: 10
      }
    },
    xaxis: {
      type: 'datetime',
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '13px' },
        datetimeFormatter: {
          month: 'MMM'
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontSize: '0.8125rem',
          colors: 'var(--mui-palette-text-primary)'
        }
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          dataLabels: {
            style: { fontSize: '0.625rem' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={8} className='max-sm:border-be sm:border-ie'>
          <CardHeader title='Project Timeline' subheader='Total 840 Task Completed' />
          <CardContent>
            <AppReactApexCharts height={315} width='100%' type='rangeBar' series={series} options={options} />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={4} className='flex flex-col'>
          <CardHeader
            title='Project List'
            subheader='3 Ongoing Projects'
            action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
          />
          <CardContent className='flex flex-grow flex-col justify-center gap-6'>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='primary' variant='rounded'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M17 18.8187H7V6.09144H17V18.8187ZM17 2.45508H7C5.89 2.45508 5 3.26417 5 4.27326V20.6369C5 21.1191 5.21071 21.5816 5.58579 21.9225C5.96086 22.2635 6.46957 22.4551 7 22.4551H17C17.5304 22.4551 18.0391 22.2635 18.4142 21.9225C18.7893 21.5816 19 21.1191 19 20.6369V4.27326C19 3.26417 18.1 2.45508 17 2.45508Z'
                    fill='currentColor'
                  />
                </svg>
              </CustomAvatar>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  IOS Application
                </Typography>
                <Typography variant='body2'>Task 840/2.5k</Typography>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='success' variant='rounded'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19 9.45508L20.25 6.70508L23 5.45508L20.25 4.20508L19 1.45508L17.75 4.20508L15 5.45508L17.75 6.70508L19 9.45508ZM11.5 9.95508L9 4.45508L6.5 9.95508L1 12.4551L6.5 14.9551L9 20.4551L11.5 14.9551L17 12.4551L11.5 9.95508ZM19 15.4551L17.75 18.2051L15 19.4551L17.75 20.7051L19 23.4551L20.25 20.7051L23 19.4551L20.25 18.2051L19 15.4551Z'
                    fill='currentColor'
                  />
                </svg>
              </CustomAvatar>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  Web Application
                </Typography>
                <Typography variant='body2'>Task 99/1.42k</Typography>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='secondary' variant='rounded'>
                <svg width='24' height='24' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M16.6666 3.83331H3.33329C2.40829 3.83331 1.67496 4.57498 1.67496 5.49998L1.66663 15.5C1.66663 16.425 2.40829 17.1666 3.33329 17.1666H16.6666C17.5916 17.1666 18.3333 16.425 18.3333 15.5V5.49998C18.3333 4.57498 17.5916 3.83331 16.6666 3.83331ZM16.6666 15.5H3.33329V10.5H16.6666V15.5ZM16.6666 7.16665H3.33329V5.49998H16.6666V7.16665Z'
                    fill='currentColor'
                  />
                </svg>
              </CustomAvatar>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  Bank Dashboard
                </Typography>
                <Typography variant='body2'>Task 58/100</Typography>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <CustomAvatar skin='light' color='info' variant='rounded'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M16 11.4551H15V3.45508C15 2.35508 14.1 1.45508 13 1.45508H11C9.9 1.45508 9 2.35508 9 3.45508V11.4551H8C5.24 11.4551 3 13.6951 3 16.4551V23.4551H21V16.4551C21 13.6951 18.76 11.4551 16 11.4551ZM19 21.4551H17V18.4551C17 17.9051 16.55 17.4551 16 17.4551C15.45 17.4551 15 17.9051 15 18.4551V21.4551H13V18.4551C13 17.9051 12.55 17.4551 12 17.4551C11.45 17.4551 11 17.9051 11 18.4551V21.4551H9V18.4551C9 17.9051 8.55 17.4551 8 17.4551C7.45 17.4551 7 17.9051 7 18.4551V21.4551H5V16.4551C5 14.8051 6.35 13.4551 8 13.4551H16C17.65 13.4551 19 14.8051 19 16.4551V21.4551Z'
                    fill='currentColor'
                  />
                </svg>
              </CustomAvatar>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  UI Kit Design
                </Typography>
                <Typography variant='body2'>Task 120/350</Typography>
              </div>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProjectTimeline
