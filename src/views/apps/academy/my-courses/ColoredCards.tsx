// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

type DataType = {
  title: string
  description: string
  type: string
  image: string
  colorClass: string
  imageColorClass?: string
  bgColorClass?: string
}

// Vars
const data: DataType[] = [
  {
    title: 'Earn a Certificate',
    description: 'Get the right professional certificate program for you.',
    type: 'Programs',
    image: '/images/illustrations/characters/10.png',
    colorClass: 'text-info',
    imageColorClass: 'bg-infoLight',
    bgColorClass: 'bg-infoLighter'
  },
  {
    title: 'Best Rated Courses',
    description: 'Enroll now in the most popular and best rated courses.',
    type: 'Courses',
    image: '/images/illustrations/characters/14.png',
    colorClass: 'text-error',
    imageColorClass: 'bg-errorLight',
    bgColorClass: 'bg-errorLighter'
  }
]

const ColoredCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <div
            className={classnames(
              'flex max-sm:flex-col items-center sm:items-start justify-between gap-6 rounded p-5',
              item.bgColorClass
            )}
          >
            <div className='flex flex-col items-center sm:items-start max-sm:text-center'>
              <Typography variant='h5' className={classnames('mbe-2', item.colorClass)}>
                {item.title}
              </Typography>
              <Typography className='mbe-4 text-textPrimary'>{item.description}</Typography>
              <Button
                variant='contained'
                size='small'
                color={item.colorClass.split('-')[1] as ThemeColor}
              >{`View ${item.type}`}</Button>
            </div>
            <div
              className={classnames(
                'flex justify-center rounded-md min-is-[180px] max-sm:-order-1 pbs-[7px]',
                item.imageColorClass
              )}
            >
              <img src={item.image} alt={item.title} className='bs-[120px]' />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default ColoredCards
