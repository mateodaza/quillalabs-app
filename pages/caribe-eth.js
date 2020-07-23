import CaribeView from '../components/CaribeEth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'

function CaribeEth({user}) {
  return (
    <CaribeView />
  )
}

CaribeEth.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default withTranslation('common')(CaribeEth)
