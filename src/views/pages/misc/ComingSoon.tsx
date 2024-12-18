'use client'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Form from '@components/Form'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const ComingSoon = ({ mode }: { mode: SystemMode }) => {
  // Vars
  const darkImg = '/images/pages/misc-mask-3-dark.png'
  const lightImg = '/images/pages/misc-mask-3-light.png'

  // Hooks
  const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex flex-col items-center justify-center min-bs-[100dvh] relative is-full p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='is-[90vw] sm:is-[unset]'>
          <div className='flex flex-col gap-2'>
            <Typography variant='h4'>We are launching soon 🚀</Typography>
            <Typography className='mbe-10'>
              Our website is opening soon. Please register to get notified when it&#39;s ready!
            </Typography>
          </div>
          <Form noValidate autoComplete='off'>
            <div className='flex justify-center gap-4'>
              <TextField autoFocus size='small' type='email' placeholder='Enter your email' className='is-[70%]' />
              <Button type='submit' variant='contained' className='self-center'>
                Notify
              </Button>
            </div>
          </Form>
        </div>
        <img
          alt='error-illustration'
          src='/images/illustrations/characters/5.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
        />
      </div>
      <img src={miscBackground} className='absolute bottom-0 z-[-1] is-full max-md:hidden' />
    </div>
  )
}

export default ComingSoon
