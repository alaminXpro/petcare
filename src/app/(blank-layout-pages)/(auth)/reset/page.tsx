import type { Metadata } from 'next'

import { ResetForm } from '@/components/form/reset-form'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

export default function ForgotPassword() {
  return <ResetForm />
}
