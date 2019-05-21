import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import { Provider } from 'mobx-react'
import mobxWrapper from '../lib/mobx-wrapper'

class MyApp extends App {

  render () {
    const { Component, pageProps, apolloClient, mobxStore } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={mobxStore}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(mobxWrapper(MyApp))
