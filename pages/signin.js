// import Link from 'next/link'
import { Link } from '../routes'

import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

import Layout from '../components/shared/Layout'
import SigninBox from '../components/SigninBox'

export default class Signin extends React.Component {

  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    // console.log({loggedInUser})
    if (loggedInUser.getCurrentUser) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }
    return {}
  }

  render () {
    return (
      <Layout>
        <React.Fragment>
          <SigninBox />
          <hr />
          Eres nuevo?{' '}
          <Link prefetch href='/create-account'>
            <a>Crea una cuenta!</a>
          </Link>
        </React.Fragment>
      </Layout>
    )
  }
}
