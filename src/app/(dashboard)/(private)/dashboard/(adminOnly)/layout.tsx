import { currentUser } from '@/lib/auth'
import NotAuthorized from '@/views/NotAuthorized'
import { getSystemMode } from '@/@core/utils/serverHelpers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  const mode = getSystemMode()

  if (!user || user.role !== 'Admin') {
    return <NotAuthorized mode={mode} />
  }

  return <>{children}</>
}
