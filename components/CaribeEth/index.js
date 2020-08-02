import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { random } from '../../lib/images'
import Link from 'next/link';    
import { withTranslation } from '../../i18n'
import Layout from '../shared/Layout'
import WithAuth from '../../lib/withAuth'
import { Fragment } from 'react'

function CaribeEth({store, t}) {
  const { isMobile } = store.authStore
  const router = useRouter()

  return (
    <Layout> 
      <div className="row about-container">
        <div className="left-content">
          <img className="big-img" src={random.eth_art_1} alt="tomas sanchez"/>
        </div>
        <div className="right-content">
          <h3>Caribe.Eth</h3>
          <p>{t('what-we-do-text')}</p>
          <div className="row social">
            <Link href="https://twitter.com/EthereumCaribe" prefetch={false}>
            <a style={{marginRight: '2em'}}>
              Twitter
            </a>
            </Link>
            <Link href="https://t.me/EthereumCaribe" prefetch={false}>
            <a >
              Telegram
            </a>
            </Link>
          </div>

        </div>
      </div>   
      <style jsx>{`

      `}</style>

      <style jsx>{`
        .about-container {
          display: flex;
        }
        .right-content {
          width: 50vw;
          margin: 0 5%;
        }
        .left-content {
          width: 50vw;
          display: flex;
          align-items: flex-end;
          flex-direction: column
        }
        .big-img {
          width: 100%;
          align-self: center;
          height: auto;
        }

        .social {
          width: 100%;
          justify-content: flex-start
        }
        @media screen and (max-width: 900px) {
          .left-content {
            margin: 5% 0;
            width: 100%;
          }
          .right-content {
            width: 100%;
            margin: 0
          }
          .about-container {
            flex-direction: column
          }
        }
      `}</style>
    </Layout>
  )
}

export default withTranslation(['home', 'common'])(WithAuth(CaribeEth, false))
