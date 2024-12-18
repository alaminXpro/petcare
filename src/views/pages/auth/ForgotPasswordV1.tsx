'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Form from '@components/Form'
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const ForgotPasswordV1 = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-4-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-4-light.png'

  // Hooks

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] is-full relative p-6'>
      <Card className='flex flex-col sm:is-[460px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href={'/'} className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Forgot Password 🔒</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Enter your email and we&#39;ll send you instructions to reset your password
            </Typography>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
              <TextField autoFocus fullWidth label='Email' />
              <Button fullWidth variant='contained' type='submit'>
                Send reset link
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href={'/pages/auth/login-v1'} className='flex items-center gap-1.5'>
                  <DirectionalIcon
                    ltrIconClass='ri-arrow-left-s-line'
                    rtlIconClass='ri-arrow-right-s-line'
                    className='text-xl'
                  />
                  <span>Back to Login</span>
                </Link>
              </Typography>
            </Form>
          </div>
        </CardContent>
      </Card>
      <img src={authBackground} className='absolute bottom-[5%] z-[-1] is-full max-md:hidden' />
    </div>
  )
}

export default ForgotPasswordV1
