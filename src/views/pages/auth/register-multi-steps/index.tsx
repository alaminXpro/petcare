'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import MuiStepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { StepperProps } from '@mui/material/Stepper'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import StepperWrapper from '@core/styles/stepper'
import StepAccountDetails from './StepAccountDetails'
import StepPersonalInfo from './StepPersonalInfo'
import StepBillingDetails from './StepBillingDetails'
import StepperCustomDot from '@components/stepper-dot'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Vars
const steps = [
  {
    title: 'Account',
    subtitle: 'Account Details'
  },
  {
    title: 'Personal',
    subtitle: 'Enter Information'
  },
  {
    title: 'Billing',
    subtitle: 'Payment Details'
  }
]

// Styled Components
const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))

const getStepContent = (step: number, handleNext: () => void, handlePrev: () => void) => {
  switch (step) {
    case 0:
      return <StepAccountDetails handleNext={handleNext} />
    case 1:
      return <StepPersonalInfo handleNext={handleNext} handlePrev={handlePrev} />
    case 2:
      return <StepBillingDetails handlePrev={handlePrev} />

    default:
      return null
  }
}

const RegisterMultiSteps = () => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0)

  // Hooks
  const { settings } = useSettings()

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className='flex bs-full justify-between items-center'>
      <div
        className={classnames('flex bs-full items-center justify-center is-[450px] max-lg:hidden', {
          'border-ie': settings.skin === 'bordered'
        })}
      >
        <img
          src='/images/illustrations/characters/2.png'
          alt='multi-steps-character'
          className='mlb-12 bs-auto max-bs-[555px] max-is-full'
        />
      </div>
      <div className='flex flex-1 justify-center items-center bs-full bg-backgroundPaper'>
        <Link href={'/'} className='absolute block-start-5 sm:block-start-[25px] inline-start-6 sm:inline-start-[25px]'>
          <Logo />
        </Link>
        <StepperWrapper className='p-6 sm:p-8 max-is-[740px] mbs-11 sm:mbs-14 lg:mbs-0'>
          <Stepper className='mbe-6 md:mbe-12' activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {getStepContent(activeStep, handleNext, handlePrev)}
        </StepperWrapper>
      </div>
    </div>
  )
}

export default RegisterMultiSteps
