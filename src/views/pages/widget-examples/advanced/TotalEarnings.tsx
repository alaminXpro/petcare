'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { SystemMode, ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

type DataProps = {
  image: string
  title: string
  subtitle: string
  progress: number
  progressColor: ThemeColor
}

const Data: DataProps[] = [
  {
    image: '/images/cards/zipcar.png',
    title: 'Zipcar',
    subtitle: 'Vuejs, React & HTML',
    progress: 24895.65,
    progressColor: 'primary'
  },
  {
    image: '/images/cards/bitbank.png',
    title: 'Bitbank',
    subtitle: 'Sketch, Figma & XD',
    progress: 86500.2,
    progressColor: 'info'
  },
  {
    image: '/images/cards/aviato.png',
    title: 'Aviato',
    subtitle: 'HTML & Anguler',
    progress: 12450.8,
    progressColor: 'secondary'
  }
]

const TotalEarnings = ({ serverMode }: { serverMode: SystemMode }) => {
  // Hooks
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  return (
    <Card>
      <CardHeader
        title='Total Earnings'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='flex flex-col gap-14 pbs-0.5'>
        <div>
          <div className='flex items-center'>
            <Typography variant='h3'>$24,895</Typography>
            <i className='ri-arrow-up-s-line text-2xl text-success' />
            <Typography color='success.main'>22%</Typography>
          </div>
          <Typography>Compared to $84,325 last year</Typography>
        </div>
        <div className='flex flex-col gap-7'>
          {Data.map((item, index) => (
            <div key={index} className='flex justify-between items-center gap-3 last:m-0'>
              <div className='flex items-center gap-3'>
                <Avatar
                  variant='rounded'
                  className={classnames('bg-actionHover is-[40px] bs-[40px]', {
                    'bg-white': _mode === 'dark',
                    'bg-actionHover': _mode === 'light'
                  })}
                >
                  <img src={item.image} width={40} height={40} />
                </Avatar>
                <div className='flex flex-col flex-wrap gap-0.5'>
                  <Typography color='text.primary' className='font-medium'>
                    {item.title}
                  </Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <Typography className='font-medium' color='text.primary'>
                  ${item.progress}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={75}
                  color={item.progressColor}
                  className='is-20 max-bs-1'
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalEarnings
