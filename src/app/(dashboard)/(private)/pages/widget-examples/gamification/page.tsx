// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Award from '@views/pages/widget-examples/gamification/Award'
import UpgradeAccount from '@views/pages/widget-examples/gamification/UpgradeAccount'
import CongratulationsJohn from '@views/pages/widget-examples/gamification/CongratulationsJohn'
import CongratulationsDaisy from '@views/pages/widget-examples/gamification/CongratulationsDaisy'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Statistics = async () => {
  // Vars
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Award />
      </Grid>
      <Grid item xs={12} md={8}>
        <CongratulationsJohn serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={8}>
        <CongratulationsDaisy serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={4}>
        <UpgradeAccount />
      </Grid>
    </Grid>
  )
}

export default Statistics
