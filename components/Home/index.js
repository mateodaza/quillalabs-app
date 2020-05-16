import Head from 'next/head'
import { inject, observer } from 'mobx-react'

import Layout from './shared/Layout'

function Home(props) {
  const { authStore } = props.store

  return (
    <Layout>    
      <div className="container">
        <a className="button button-outline" href="#">This is the beginning</a>
      </div>
      <style jsx>{`

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}

export default inject("store")(observer(Home))
