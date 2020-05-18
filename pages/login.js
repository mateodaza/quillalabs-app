import Auth from '../components/Auth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

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

const LoginComponent = withAuthComponent(withTranslation('common')(Login))
export default inject("store")(observer(LoginComponent))
export const getServerSideProps = withAuthServerSideProps(Login.getInitialProps);