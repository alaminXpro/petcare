'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Third-party Components
import classnames from 'classnames'

const UpgradeAccount = () => {
  // Hooks
  const theme = useTheme()

  return (
    <Card>
      <Grid container>
        <Grid item xs={8}>
          <CardContent className='flex flex-col items-start gap-3'>
            <div className='flex flex-col'>
              <Typography variant='h5'>Upgrade Account 😀</Typography>
              <Typography variant='subtitle1'>Add 15 team members</Typography>
            </div>
            <div className='flex flex-col'>
              <Typography variant='h4' color='primary'>
                $199
              </Typography>
              <Typography>40% OFF 😍</Typography>
            </div>
            <Button size='small' variant='contained'>
              Upgrade Plan
            </Button>
          </CardContent>
        </Grid>
        <Grid item xs={4}>
          <div className='relative bs-full is-full'>
            <img
              alt='Upgrade Account'
              src='/images/cards/upgrade-account.png'
              className={classnames('max-bs-[168px] absolute block-end-5 inline-end-5 max-is-full', {
                'scale-x-[-1]': theme.direction === 'rtl'
              })}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default UpgradeAccount
