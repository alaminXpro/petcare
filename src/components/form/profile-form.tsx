'use client'

import { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import type { z } from 'zod'

import { toast } from 'sonner'

import { UserRound } from 'lucide-react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton
} from '@mui/material'

import { profileSchema } from '@/schemas'

import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/auth/form-input'
import { Button } from '@/components/ui/button'
import { profile, deleteAccount } from '@/actions/profile'

import type { ExtendedUser } from '@/types/next-auth'
import { FormToggle } from '@/components/auth/form-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileFormProps = {
  user: ExtendedUser
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const router = useRouter()

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

  const handleSubmit = form.handleSubmit(values => {
    startTransition(() => {
      profile(values).then(data => {
        if (data.success) {
          form.reset()

          return toast.success(data.message)
        }

        return toast.error(data.error.message)
      })
    })
  })

  const handleClose = () => setOpen(false)

  const onDelete = () => {
    startTransition(() => {
      deleteAccount().then(data => {
        if (data.success) {
          toast.success(data.message)
          router.push('/auth/login')
        } else {
          toast.error(data.error.message)
        }

        handleClose()
      })
    })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you absolutely sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            This action cannot be undone. This will permanently delete your account and remove all your data from our
            servers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose} disabled={isPending} color='primary'>
            Cancel
          </MuiButton>
          <MuiButton onClick={onDelete} disabled={isPending} color='error' variant='contained' autoFocus>
            {isPending ? 'Deleting...' : 'Delete Account'}
          </MuiButton>
        </DialogActions>
      </Dialog>

      <div className='col-span-2 col-start-2 flex justify-center'>
        <Avatar className='w-64 h-64'>
          <AvatarImage src={user.image ?? ''} />
          <AvatarFallback>
            <UserRound size={128} />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className='col-span-3 space-y-12'>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <FormInput
                control={form.control}
                name='name'
                label='Name'
                type='text'
                placeholder='e.g. John Doe'
                isPending={isPending}
              />
              {!user.isOAuth && (
                <>
                  <FormInput
                    control={form.control}
                    name='email'
                    label='Email Address'
                    type='email'
                    placeholder='e.g. johndoe@example.com'
                    isPending={isPending}
                    disabled={user.isOAuth}
                  />
                  <FormInput
                    control={form.control}
                    name='password'
                    label='Old Password'
                    type='password'
                    placeholder='******'
                    autoComplete='off'
                    isPending={isPending}
                  />
                  <FormInput
                    control={form.control}
                    name='newPassword'
                    label='New Password'
                    type='password'
                    placeholder='******'
                    autoComplete='off'
                    isPending={isPending}
                  />
                  <FormToggle
                    control={form.control}
                    name='isTwoFactorEnabled'
                    label='Two-Factor Authentication'
                    description='Protect your account with additional security by enabling two-factor authentication for login. You will be required to enter both your credentials and an authentication code to login.'
                    isPending={isPending}
                  />
                </>
              )}
            </div>
            <Button type='submit' disabled={isPending} className='w-full'>
              Update profile
            </Button>
          </form>
        </Form>

        <MuiButton variant='contained' color='error' fullWidth onClick={() => setOpen(true)}>
          Delete Account
        </MuiButton>
      </div>
    </>
  )
}
