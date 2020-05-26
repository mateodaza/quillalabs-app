import DashboardView from '../components/Dashboard'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'
import WithAuth from '../lib/withAuth'

function Dashboard() {
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

const DashboardComponent = inject("store")(observer(WithAuth(DashboardView)))
export default withTranslation('common')(DashboardComponent)
