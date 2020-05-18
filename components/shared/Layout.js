import { withTranslation } from '../../i18n'
import colors from '../../common/colors'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, noHeader, t, i18n, noHorizontalPadding }) => {
  const lan = i18n.language === 'en' ? 'ESP' : 'ENG'
  return (
    <div>
      <Head>
        <title>QuillaLabs</title>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="https://i.imgur.com/QIvQlG1.png" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main-container">
        <a
          className='lng-btn'
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
        >
          {lan}
        </a>
        { !noHeader && <Header /> }
        <div className="main-content" style={{padding: noHorizontalPadding ? "5% 0" : "2%" }}>
          {children}
        </div>
        <Footer />
      </main>
      <style global jsx>{`
      @font-face {
        font-family: 'Avenir Next';
        src: url(../../public/assets/fonts/AvenirNextLTPro-Regular.otf) format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Avenir Next Bold';
        src: url(../../public/assets/fonts/AvenirNextLTPro-Bold.otf) format('truetype');
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
        background-color: ${colors.white};
      }
      .main-content {
        min-height: 90vh;
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
      .lng-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        padding: 0.5% 2.5% 0 0;
      }
    `}</style>
    </div>
  )
}

export default withTranslation(['common'])(Layout)