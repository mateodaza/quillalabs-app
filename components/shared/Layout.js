import { withApollo } from 'react-apollo'
import colors from '../../common/colors'
import Head from 'next/head'
import Header from './Header'

const SigninBox = ({ client, withHeader, children }) => {


  return (
    <div>
      <Head>
        <title>QuillaLabs</title>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="main-container">
        {children}
      </div>
      <style global jsx>{`
      * {
        background-color: ${colors.white};
        font-family: 'Noto Sans'
      }
      p {
        color: ${colors.black}
      }
      h3 {
        color: ${colors.black}
      }
      .main-container {
        margin: 0 10%;
        background-color: ${colors.white}
      }
    `}</style>
    </div>
  )
}

export default withApollo(SigninBox)
