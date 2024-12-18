// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Types Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

type DataProps = {
  image: string
  title: string
  subtitle: string
  visitors: string
  chipLabel: string
  chipColor: ThemeColor
}

const Data: DataProps[] = [
  {
    image: '/images/cards/social-facebook.png',
    title: 'Facebook',
    subtitle: 'Social Media',
    visitors: '12,348',
    chipLabel: '+12%',
    chipColor: 'success'
  },
  {
    image: '/images/cards/social-dribbble.png',
    title: 'Dribbble',
    subtitle: 'Community',
    visitors: '8,450',
    chipLabel: '+32%',
    chipColor: 'success'
  },
  {
    image: '/images/cards/social-twitter.png',
    title: 'Twitter',
    subtitle: 'Social Media',
    visitors: '350',
    chipLabel: '-8%',
    chipColor: 'error'
  },
  {
    image: '/images/cards/social-instagram.png',
    title: 'Instagram',
    subtitle: 'Social Media',
    visitors: '25,566',
    chipLabel: '+45%',
    chipColor: 'success'
  }
]

const SocialNetworkVisits = () => {
  return (
    <Card>
      <CardHeader
        title='Social Network Visits'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent className='flex flex-col gap-6'>
        <div>
          <div className='flex items-center'>
            <Typography variant='h4'>$24,895</Typography>
            <i className='ri-arrow-up-s-line text-2xl text-success' />
            <Typography color='success.main'>62%</Typography>
          </div>
          <Typography>Last 1 Year Visits</Typography>
        </div>
        <div className='flex flex-col gap-4 max-[1396px]:gap-6'>
          {Data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <img src={item.image} width={34} height={34} />
              <div className='flex flex-wrap justify-between items-center gap-x-2 gap-y-1 is-full'>
                <div className='flex flex-col gap-0.5'>
                  <Typography className='font-medium' color='text.primary'>
                    {item.title}
                  </Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <Typography color='text.primary' className='font-medium'>
                    {item.visitors}
                  </Typography>
                  <Chip label={item.chipLabel} color={item.chipColor} variant='tonal' size='small' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SocialNetworkVisits
