'use client'

import { useTransition, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { toast } from 'sonner'
import { UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  FormHelperText
} from '@mui/material'

import { profileSchema } from '@/schemas'
import { profile } from '@/actions/profile'
import type { ExtendedUser } from '@/types/next-auth'

type ProfileFormProps = {
  user: ExtendedUser
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition()
  const { update: updateSession } = useSession()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    values: {
      name: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined
    }
  })

  // Update form values when user data changes
  useEffect(() => {
    form.reset({
      name: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined
    })
  }, [user, form])

  const handleSubmit = form.handleSubmit(values => {
    startTransition(() => {
      profile(values).then(async data => {
        if (data.success) {
          // Update session data
          await updateSession()

          // Reset password fields only
          form.setValue('password', undefined)
          form.setValue('newPassword', undefined)

          return toast.success(data.message)
        }

        return toast.error(data.error.message)
      })
    })
  })

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 256, height: 256 }} src={user.image ?? ''} alt={user.name ?? 'Profile'}>
            <UserRound size={128} />
          </Avatar>
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Box component='form' onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
              <TextField
                fullWidth
                label='Name'
                {...form.register('name')}
                error={!!form.formState.errors.name}
                helperText={form.formState.errors.name?.message}
                disabled={isPending}
                placeholder='e.g. John Doe'
              />

              {!user.isOAuth && (
                <>
                  <TextField
                    fullWidth
                    label='Email Address'
                    type='email'
                    {...form.register('email')}
                    error={!!form.formState.errors.email}
                    helperText={form.formState.errors.email?.message}
                    disabled={isPending || user.isOAuth}
                    placeholder='e.g. johndoe@example.com'
                  />

                  <TextField
                    fullWidth
                    label='Old Password'
                    type='password'
                    {...form.register('password')}
                    error={!!form.formState.errors.password}
                    helperText={form.formState.errors.password?.message}
                    disabled={isPending}
                    placeholder='******'
                  />

                  <TextField
                    fullWidth
                    label='New Password'
                    type='password'
                    {...form.register('newPassword')}
                    error={!!form.formState.errors.newPassword}
                    helperText={form.formState.errors.newPassword?.message}
                    disabled={isPending}
                    placeholder='******'
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        {...form.register('isTwoFactorEnabled')}
                        checked={form.watch('isTwoFactorEnabled')}
                        disabled={isPending}
                      />
                    }
                    label='Two-Factor Authentication'
                  />
                  <FormHelperText>
                    Protect your account with additional security by enabling two-factor authentication for login.
                  </FormHelperText>
                </>
              )}

              <Button fullWidth variant='contained' type='submit' disabled={isPending} sx={{ mt: 3 }}>
                Update Profile
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
