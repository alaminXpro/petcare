// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import ActivityTimeline from '@views/pages/widget-examples/advanced/ActivityTimeline'
import FinanceApp from '@views/pages/widget-examples/advanced/FinanceApp'
import GeneralStatistics from '@views/pages/widget-examples/advanced/GeneralStatistics'
import MeetingSchedule from '@views/pages/widget-examples/advanced/MeetingSchedule'
import PaymentHistory from '@views/pages/widget-examples/advanced/PaymentHistory'
import PlanUpgrade from '@views/pages/widget-examples/advanced/PlanUpgrade'
import ProjectStatistics from '@views/pages/widget-examples/advanced/ProjectStatistics'
import SalesInCountries from '@views/pages/widget-examples/advanced/SalesInCountries'
import SocialNetworkVisits from '@views/pages/widget-examples/advanced/SocialNetworkVisits'
import TopReferralSources from '@views/pages/widget-examples/advanced/TopReferralSources'
import TotalEarnings from '@views/pages/widget-examples/advanced/TotalEarnings'
import Transactions from '@views/pages/widget-examples/advanced/Transactions'
import SubscribersByCountries from '@views/pages/widget-examples/advanced/SubscribersByCountries'
import OrdersByCountries from '@views/pages/widget-examples/advanced/OrdersByCountries'
import DeliveryPerformance from '@views/pages/widget-examples/advanced/DeliveryPerformance'
import PopularInstructors from '@views/pages/widget-examples/advanced/PopularInstructors'
import TopCourses from '@views/pages/widget-examples/advanced/TopCourses'
import UpcomingWebinar from '@views/pages/widget-examples/advanced/UpcomingWebinar'
import AssignmentProgress from '@views/pages/widget-examples/advanced/AssignmentProgress'
import VehicleOverview from '@views/pages/widget-examples/advanced/VehicleOverview'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Advanced = () => {
  // Vars
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}>
        <Transactions />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <PlanUpgrade serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MeetingSchedule />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ProjectStatistics serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TopReferralSources />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TotalEarnings serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <GeneralStatistics />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <PopularInstructors />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopCourses />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <UpcomingWebinar />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <AssignmentProgress />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SalesInCountries />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <PaymentHistory serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SubscribersByCountries />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <OrdersByCountries />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DeliveryPerformance />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SocialNetworkVisits />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <ActivityTimeline />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <FinanceApp />
      </Grid>
      <Grid item xs={12} xl={8}>
        <VehicleOverview />
      </Grid>
    </Grid>
  )
}

export default Advanced
