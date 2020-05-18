import Auth from '../components/Auth'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function Register({user}) {
  return (
    <Auth type="register" />
  )
}

Register.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common', 'auth'],
    mobileCheck: mobileCheck(ctx)
  }
}

const RegisterComponent = withAuthComponent(withTranslation('common')(Register))
export default inject("store")(observer(RegisterComponent))
export const getServerSideProps = withAuthServerSideProps(Register.getInitialProps);