import DashboardView from '../components/Dashboard'
import mobileCheck from '../lib/mobileCheck'

function Dashboard({mobileCheck}) {
  console.log({mobileCheck})
  return (
    <DashboardView />
  )
}

Dashboard.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common', 'auth'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default Dashboard
