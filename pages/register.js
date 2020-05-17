import Auth from '../components/Auth'
import { withTranslation } from '../i18n'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function Register({user}) {
  return (
    <Auth type="register" />
  )
}

Register.getInitialProps = async () => ({
  namespacesRequired: ['common', 'auth'],
})

export default withAuthComponent(withTranslation('common')(Register))
export const getServerSideProps = withAuthServerSideProps();