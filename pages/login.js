import Auth from '../components/Auth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'


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

const LoginComponent = inject("store")(observer(Login))
export default withTranslation('common')(LoginComponent)
