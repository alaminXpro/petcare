// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import TotalTransactions from '@views/pages/widget-examples/charts/TotalTransactions'
import PerformanceOverview from '@views/pages/widget-examples/charts/PerformanceOverview'
import VisitsByDay from '@views/pages/widget-examples/charts/VisitsByDay'
import OrganicSessions from '@views/pages/widget-examples/charts/OrganicSessions'
import WeeklySales from '@views/pages/widget-examples/charts/WeeklySales'
import ProjectTimeline from '@views/pages/widget-examples/charts/ProjectTimeline'
import MonthlyBudget from '@views/pages/widget-examples/charts/MonthlyBudget'
import Performance from '@views/pages/widget-examples/charts/Performance'
import ExternalLinks from '@views/pages/widget-examples/charts/ExternalLinks'
import SalesCountry from '@views/pages/widget-examples/charts/SalesCountry'
import ActivityTimeline from '@views/pages/widget-examples/charts/ActivityTimeline'
import WeeklyOverview from '@views/pages/widget-examples/charts/WeeklyOverview'
import InterestedTopics from '@views/pages/widget-examples/charts/InterestedTopics'
import DeliveryExceptions from '@views/pages/widget-examples/charts/DeliveryExceptions'
import ShipmentStatistics from '@views/pages/widget-examples/charts/ShipmentStatistics'

const Charts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <TotalTransactions />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <PerformanceOverview />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <VisitsByDay />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <OrganicSessions />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <WeeklySales />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProjectTimeline />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MonthlyBudget />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Performance />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ExternalLinks />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SalesCountry />
      </Grid>
      <Grid item xs={12} md={8}>
        <ActivityTimeline />
      </Grid>
      <Grid item xs={12} md={4}>
        <WeeklyOverview />
      </Grid>
      <Grid item xs={12} md={8}>
        <InterestedTopics />
      </Grid>
      <Grid item xs={12} md={4}>
        <DeliveryExceptions />
      </Grid>
      <Grid item xs={12} xl={8}>
        <ShipmentStatistics />
      </Grid>
    </Grid>
  )
}

export default Charts
