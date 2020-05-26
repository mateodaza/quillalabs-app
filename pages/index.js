import HomePage from '../components/Home'
import { withTranslation } from '../i18n'

function Home(props) {
  return (
    <HomePage />
  )
}

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'home'],
  }
}

export default withTranslation('common')(Home)