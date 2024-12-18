// Component Imports

import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Vars

  const mode = getServerMode()
  const systemMode = getSystemMode()

  return (
    <BlankLayout systemMode={systemMode}>
      <NotFound mode={mode} />
    </BlankLayout>
  )
}

export default NotFoundPage
