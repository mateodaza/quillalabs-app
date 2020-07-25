import DashboardView from '../components/Dashboard'
import mobileCheck from '../lib/mobileCheck'
import Web3View from '../components/Web3Test'

function Web3Test({mobileCheck}) {
  return (
    <Web3View />
  )
}

Web3Test.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common', 'auth'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default Web3Test