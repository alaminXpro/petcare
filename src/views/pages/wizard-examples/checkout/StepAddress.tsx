'use client'

import { Box, Button, TextField, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { AddressFormData } from '@/lib/validations/checkout'
import { addressFormSchema } from '@/lib/validations/checkout'

interface Props {
  handleNext: () => void
}

export default function StepAddress({ handleNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      phone: '',
      address: '',
      notes: ''
    }
  })

  const onSubmit = (data: AddressFormData) => {
    sessionStorage.setItem('checkoutAddress', JSON.stringify(data))
    handleNext()
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextField
          fullWidth
          label='Phone Number'
          {...register('phone')}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />

        <TextField
          fullWidth
          label='Shipping Address'
          multiline
          rows={3}
          {...register('address')}
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
        />

        <TextField fullWidth label='Order Notes (Optional)' multiline rows={2} {...register('notes')} />

        <Box sx={{ textAlign: 'right' }}>
          <Button type='submit' variant='contained'>
            Proceed to Payment
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
