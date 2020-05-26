import Auth from '../components/Auth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'


function Register({user}) {
  return (
    <Auth type="register"/>
  )
}

Register.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common', 'auth'],
    mobileCheck: mobileCheck(ctx)
  }
}

const RegisterComponent = inject("store")(observer(Register))
export default withTranslation('common')(RegisterComponent)
