import Auth from '../components/Auth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'

function Login({user}) {
  return (
    <Auth type="login" />
  )
}

Login.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common', 'auth'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default withTranslation('common')(Login)
