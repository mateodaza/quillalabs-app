import HomePage from '../components/Home'
import { withTranslation } from '../i18n'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function Home({user}) {
  return (
    <HomePage />
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'home'],
})

export default withAuthComponent(withTranslation('common')(Home))

export const getServerSideProps = withAuthServerSideProps((context, user)=>{
  // This is an example to make a fetch server side with auth
  return {
    props: {},
  }
});