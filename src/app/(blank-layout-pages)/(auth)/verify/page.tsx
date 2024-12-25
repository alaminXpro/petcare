import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { newVerification } from '@/actions/verify-token'
import { NewVerificationForm } from '@/components/form/verify-token-form'

export const metadata: Metadata = {
  title: 'Verify Email'
}

export default async function NewVerificationPage({ searchParams }: { searchParams: { token: string } }) {
  if (!searchParams.token) redirect('/login')
  const data = await newVerification(searchParams.token)

  return <NewVerificationForm data={data} />
}
