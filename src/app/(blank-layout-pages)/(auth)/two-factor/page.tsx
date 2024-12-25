import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import type { z } from 'zod'

import { TwoFactorForm } from '@/components/form/two-factor-form'
import { verifyJwtToken } from '@/lib/utils'
import type { loginSchema } from '@/schemas'
import { getTwoFactorTokenByEmail } from '@/services/two-factor-token'


export const metadata: Metadata = {
  title: 'Two-Factor Authentication'
}

export default async function TwoFactorPage() {
  const cookieStore = cookies()

  const credentials = cookieStore.get('credentials-session')

  if (!credentials) {
    redirect('/')
  }

  const verifyToken = verifyJwtToken<z.infer<typeof loginSchema>>(credentials.value)

  if (!verifyToken.valid || !verifyToken.decoded) {
    redirect('/')
  }

  const existingToken = await getTwoFactorTokenByEmail(verifyToken.decoded.email)

  if (!existingToken) {
    redirect('/')
  }

  return <TwoFactorForm payload={{ email: existingToken.email, password: verifyToken.decoded.password }} />
}
