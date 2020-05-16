import colors from '../../../common/colors'
import Head from 'next/head'
import Header from './Header'

const Layout = ({ props, children }) => {

  return (
    <div>
      <Head>
        <title>QuillaLabs</title>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="https://i.imgur.com/QIvQlG1.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main-container">
        <Header />
        {children}
      </main>
      <footer className="container footer">
       <p>QuillaLabs - 2020</p>
      </footer>
      <style global jsx>{`
      @font-face {
        font-family: 'Avenir Next';
        src: url(../../assets/fonts/AvenirNextLTPro-Regular.otf) format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Avenir Next Bold';
        src: url(../../assets/fonts/AvenirNextLTPro-Bold.otf) format('truetype');
        font-weight: bold;
        font-style: normal;
      }
      * {
        margin: 0;
        padding: 0;
        background-color: ${colors.white};
      }
      body {
        font-family: 'Avenir Next'
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
        margin: 2% 10%;
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
      .button:hover {
        box-shadow: 0 7px 11px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
      }
      .divider {
        margin: 2% 0;
        width: 100%;
        height: 2px;
        background: rgb(242,199,180); /* Old browsers */
        background: -moz-linear-gradient(left, rgba(242,199,180,1) 0%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 6%, rgba(222,222,172,1) 38%, rgba(222,222,172,1) 41%, rgba(222,222,172,1) 44%, rgba(170,220,179,1) 68%, ${colors.white} 99%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${colors.white} 99%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to left, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${colors.white} 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2c7b4', endColorstr='#f1eded',GradientType=1 );
      }
      .footer {
        display: flex;
        flex: 1;
        width: 100%;
        justify-content: flex-end;
      }
    `}</style>
    </div>
  )
}

export default Layout