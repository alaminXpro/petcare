import type { Metadata } from 'next'
import type { AuthError } from 'next-auth'

import { ErrorCard } from '@/components/auth/error-card'

export const metadata: Metadata = {
  title: 'Oops! Something went wrong'
}

export default function AuthErrorPage({ searchParams }: { searchParams: { message: AuthError['type'] } }) {
  return <ErrorCard message={searchParams.message} />
}
