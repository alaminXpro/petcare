'use client'

import type { UserRole } from '@prisma/client'

import { useCurrentRole } from '@/hooks/use-current-role'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return <></>
  }

  return <>{children}</>
}
