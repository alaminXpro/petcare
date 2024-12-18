// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const systemMode = getSystemMode()

  return <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
}

export default Layout
