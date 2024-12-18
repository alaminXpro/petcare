import { redirect } from 'next/navigation'

import { currentUser } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user || user.role == 'Customer') {
    redirect('/dashboard/become-service-provider')
  }

  return <>{children}</>
}
