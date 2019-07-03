// import Link from 'next/link'
import { Link } from '../routes'
import TicketsView from '../components/Tickets'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

import Layout from '../components/shared/Layout'

export default class Signin extends React.Component {

  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    console.log({context})
    if (!loggedInUser.getCurrentUser) {
      // Redirect if its not logged in
      if(!context.mobxStore.authStore.isLogged) {
        redirect(context, '/signin?redirect=tickets')
      }
    }
    return {}
  }

  render () {
    return (
      <Layout>
        <React.Fragment>
          <TicketsView />
        </React.Fragment>
      </Layout>
    )
  }
}
