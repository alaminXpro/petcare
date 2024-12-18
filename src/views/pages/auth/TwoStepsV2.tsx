'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Form from '@components/Form'
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Style Imports
import styles from '@/libs/styles/inputOtp.module.css'

const Slot = (props: SlotProps) => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

const TwoStepsV2 = ({ mode }: { mode: Mode }) => {
  // States
  const [otp, setOtp] = useState<string | null>(null)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-2-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-2-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-two-steps-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-two-steps-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-two-steps-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-two-steps-light-border.png'

  // Hooks
  const { settings } = useSettings()

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='pli-6 max-lg:mbs-40 lg:mbe-24'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[653px] max-is-full bs-auto'
          />
        </div>
        <img src={authBackground} className='absolute bottom-[4%] z-[-1] is-full max-md:hidden' />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link href={'/'} className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Two Step Verification 💬</Typography>
            <Typography>
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </Typography>
            <Typography className='font-medium' color='text.primary'>
              ******1234
            </Typography>
          </div>
          <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <Typography>Type your 6 digit security code</Typography>
              <OTPInput
                onChange={setOtp}
                value={otp ?? ''}
                maxLength={6}
                containerClassName='group flex items-center'
                render={({ slots }) => (
                  <div className='flex items-center justify-between w-full gap-4'>
                    {slots.slice(0, 6).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
              />
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Verify My Account
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Didn&#39;t get the code?</Typography>
              <Typography color='primary' component={Link} href='/' onClick={e => e.preventDefault()}>
                Resend
              </Typography>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default TwoStepsV2
