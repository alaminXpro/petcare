import type { Metadata } from 'next'

import { RegisterForm } from '@/components/form/register-form'

export const metadata: Metadata = {
  title: 'Register'
}

export default function RegisterPage() {
  return <RegisterForm />
}
