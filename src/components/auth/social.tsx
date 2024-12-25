'use client'

import { useSearchParams } from 'next/navigation'

import { signIn } from 'next-auth/react'
import { IoLogoGithub } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_LOGIN_REDIRECT

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl
    })
  }

  return (
    <div className='flex gap-x-2 items-center w-full'>
      <Button size='lg' className='w-full text-2xl' variant='outline' onClick={() => onClick('google')}>
        <FcGoogle />
      </Button>
      <Button size='lg' className='w-full text-2xl' variant='outline' onClick={() => onClick('github')}>
        <IoLogoGithub />
      </Button>
    </div>
  )
}
