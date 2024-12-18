'use client'
import { useSession } from 'next-auth/react'

import type { ChildrenType } from '@core/types'

// Component Imports

export default function AuthGuard({ children }: ChildrenType) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (!session) {
    window.location.reload()

    return null
  }

  return <>{children}</>
}
