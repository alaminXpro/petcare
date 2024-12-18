// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'

// Styled Components
const Content = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})<TypographyProps>(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center'
}))

// Vars
const customInputData: CustomInputVerticalData[] = [
  {
    title: 'Basic',
    value: 'basic',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full gap-2'>
        <Typography variant='body2' className='mlb-auto'>
          A simple start for start ups & Students
        </Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' variant='body2' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h4' color='primary'>
            0
          </Typography>
          <Typography color='text.disabled' component='sub' variant='body2' className='self-baseline'>
            /month
          </Typography>
        </div>
      </Content>
    ),
    isSelected: true
  },
  {
    title: 'Standard',
    value: 'standard',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full gap-2'>
        <Typography variant='body2' className='mlb-auto'>
          For small to medium businesses
        </Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' variant='body2' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h4' color='primary'>
            99
          </Typography>
          <Typography color='text.disabled' component='sub' variant='body2' className='self-baseline'>
            /month
          </Typography>
        </div>
      </Content>
    )
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full'>
        <Typography className='mlb-auto'>Solution for enterprise & organizations</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' variant='body2' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h4' color='primary'>
            499
          </Typography>
          <Typography color='text.disabled' component='sub' variant='body2' className='self-baseline'>
            /month
          </Typography>
        </div>
      </Content>
    )
  }
]

const StepBillingDetails = ({ handlePrev }: { handlePrev: () => void }) => {
  const initialSelectedOption: string = customInputData.filter(item => item.isSelected)[
    customInputData.filter(item => item.isSelected).length - 1
  ].value

  // States
  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption)

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption((prop.target as HTMLInputElement).value)
    }
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4' className='mbe-1'>
          Select Plan
        </Typography>
        <Typography>Select plan as per your requirement</Typography>
      </div>
      <Grid container spacing={5}>
        {customInputData.map((item, index) => (
          <CustomInputVertical
            type='radio'
            key={index}
            data={item}
            gridProps={{ xs: 12, sm: 4 }}
            selected={selectedOption}
            name='custom-radios-basic'
            handleChange={handleOptionChange}
          />
        ))}
      </Grid>
      <div className='mbs-6 md:mbs-12 mbe-6'>
        <Typography variant='h4' className='mbe-1'>
          Payment Information
        </Typography>
        <Typography>Enter your card information</Typography>
      </div>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField fullWidth label='Card Number' placeholder='1234 1234 1234 1234' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label='Name on Card' placeholder='John Doe' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label='Expiry Date' placeholder='MM/YY' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label='CVV' placeholder='123' />
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => alert('Submitted..!!')}
            endIcon={<i className='ri-check-line' />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepBillingDetails
