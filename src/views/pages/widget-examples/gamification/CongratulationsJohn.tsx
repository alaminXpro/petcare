'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const CongratulationsJohn = ({ serverMode }: { serverMode: SystemMode }) => {
  // Vars
  const darkImg = '/images/cards/user-john-dark.png'
  const lightImg = '/images/cards/user-john-light.png'

  // Hooks
  const image = useImageVariant(serverMode, lightImg, darkImg)

  return (
    <Card className='relative bs-full'>
      <CardContent className='sm:pbe-0'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} className='flex flex-col items-start gap-4'>
            <Typography variant='h4'>
              Congratulations <span className='font-bold'>John!</span> 🎉
            </Typography>
            <div>
              <Typography>You have done 68% 😎 more sales today.</Typography>
              <Typography>Check your new badge in your profile.</Typography>
            </div>
            <Button variant='contained'>View Portfolio</Button>
          </Grid>
          <Grid item xs={12} md={4} className='max-sm:-order-1 max-sm:flex max-sm:justify-center'>
            <img
              alt='Upgrade Account'
              src={image}
              className='max-bs-[186px] sm:absolute block-end-0 inline-end-0 max-is-full'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CongratulationsJohn
