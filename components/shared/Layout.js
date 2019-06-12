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
        text-align: center; 
        width: 40%;
        font-size: 22px;
        padding: 5px;
        color: ${colors.black3};
        margin: 10px 0;
        min-width: 200px;
        border: 0.5px solid transparent;
        outline: none;
        border-bottom: 1px solid #ccc;
      }
      input::placeholder {
        text-align: center;
        color: #ccc;
      }

      .button {
        background-color: ${colors.white};
        border: none;
        color: ${colors.black3};
        padding: 16px 32px;
        border: 0.5px darkgray solid;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 20px 2px 50px 2px;
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
