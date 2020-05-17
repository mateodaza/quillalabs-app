import Auth from '../components/Auth'
import { withTranslation } from '../i18n'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function Login({user}) {
  return (
    <Auth type="login" />
  )
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['common', 'auth'],
})

export default withAuthComponent(withTranslation('common')(Login))
export const getServerSideProps = withAuthServerSideProps();