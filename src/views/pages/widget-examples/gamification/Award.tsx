'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Third-party Components
import classnames from 'classnames'

const Award = () => {
  // Hooks
  const theme = useTheme()

  return (
    <Card>
      <CardContent className='relative'>
        <div className='flex flex-col items-start gap-3'>
          <div className='flex flex-col'>
            <Typography variant='h5'>
              Congratulations <span className='font-bold'>Norris!</span> 🎉
            </Typography>
            <Typography variant='subtitle1'>Best seller of the month</Typography>
          </div>
          <div className='flex flex-col'>
            <Typography variant='h4' color='primary'>
              $42.8k
            </Typography>
            <Typography>78% of target 🚀</Typography>
          </div>
          <Button size='small' variant='contained'>
            View Sales
          </Button>
        </div>
        <img
          src='/images/cards/trophy.png'
          className={classnames('is-[106px] absolute block-end-0 inline-end-5', {
            'scale-x-[-1]': theme.direction === 'rtl'
          })}
        />
      </CardContent>
    </Card>
  )
}

export default Award
