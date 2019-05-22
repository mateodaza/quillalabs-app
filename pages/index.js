import { observer, inject } from "mobx-react";
import { ApolloConsumer } from 'react-apollo'
import Router from 'next/router';

import Landing from '../components/Landing'

import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

export default class Index extends React.Component {

  static async getInitialProps (context, req) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    console.log({loggedInUser})
    if (loggedInUser.getCurrentUser) {
      context.mobxStore.authStore.login(loggedInUser.getCurrentUser)
    }
    return {isServer: !!req}
  }

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
