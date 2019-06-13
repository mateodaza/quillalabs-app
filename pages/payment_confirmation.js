// import Link from 'next/link'
import { Link } from '../routes'

import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import PaymentConfirmation from '../components/PaymentConfirmation';

import Layout from '../components/shared/Layout'

export default class Payment extends React.Component {

  static async getInitialProps (context) {
    // const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    // if (!loggedInUser.getCurrentUser) {
    //   console.log({loggedInUser})
    //   // Redirect if its not logged in
    //   redirect(context, '/')
    // }
    return {}
  }

  render () {
    return (
      <Layout>
        <React.Fragment>
          <PaymentConfirmation/>
        </React.Fragment>
      </Layout>
    )
  }
}
