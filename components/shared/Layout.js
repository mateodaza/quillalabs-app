import { withApollo } from 'react-apollo'
import colors from '../../common/colors'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ client, withHeader, children }) => {

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
      <Footer />
      <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        background-color: ${colors.white};
        font-family: 'Noto Sans'
      }
      a {
        text-decoration: none
      }
      p {
        color: ${colors.black}
      }
      h3 {
        color: ${colors.black}
      }
      .main-container {
        min-height: 100vh;
        margin: 0 10%;
        background-color: ${colors.white}
      }
      input {
        padding: 5px;
        margin: 10px 0;
        min-width: 200px;
        border: 1px solid #ccc;
      }
      input:focus {
        border: 0.5px solid transparent;
      }

      .button {
        background-color: ${colors.green};
        border: none;
        color: white;
        padding: 15px 10px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 20px 2px;
        cursor: pointer;
        border-radius: 8px;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
      }
      .button:hover {
        box-shadow: 0 7px 11px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
      }
    `}</style>
    </div>
  )
}

export default withApollo(Layout)
