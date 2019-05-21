import { observer, inject } from "mobx-react";
import cookie from 'cookie'
import { ApolloConsumer } from 'react-apollo'

import Landing from '../components/Landing'

import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'


@inject("store")
@observer
export default class Index extends React.Component {

  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    console.log({loggedInUser})
    if (loggedInUser.getCurrentUser) {
      this.props.store.authStore.login()
    }
    return {}
  }

  signout = apolloClient => () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    })
  }

  // render () {
  //   return (
  //     <ApolloConsumer>
  //       {client => (
  //         <div>
  //           Hello {this.props.loggedInUser.user.name}!<br />
  //           <button onClick={this.signout(client)}>Sign out</button>
  //         </div>
  //       )}
  //     </ApolloConsumer>
  //   )
  // }
  render() {
    return (
      <ApolloConsumer>
      {client => (
        <Landing />
      )}
      </ApolloConsumer>
    )
  }
}
