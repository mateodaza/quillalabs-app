import VerifyPage from '../components/Home/Verify'
import { withTranslation } from '../i18n'

function Verify(props) {
  return (
    <VerifyPage />
  )
}

Verify.getInitialProps = async (context) => {
  return {
    namespacesRequired: ['common', 'home'],
  }
}

export default withTranslation('common')(Verify)