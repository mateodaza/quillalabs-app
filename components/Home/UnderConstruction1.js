import Head from 'next/head'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import { random } from '../../lib/images'

import TextSlide from './TextSlide'
import Layout from '../shared/Layout'

function UnderConstruction(props) {
  const { t, store } = props
  const { authStore} = store
  const titles = [ 
    { text: t('get-to-know-us'), route: 'about' },
    { text: t('what-we-do'), route: 'events' },
    { text: "Caribe.Eth", route: 'caribe-eth' }
  ]
  return (
    <div className="container">  
      <section className="row container1">
        <img src={random.rocket_under_construction} className="under-construction-img"
          alt="Photo by Austrian National Library on Unsplash"/>
        <div className="under-container1-txt">
          <h2>{t('under-const-title')}</h2>
          <TextSlide titles={titles}/>
        </div>
      </section>
      <style jsx>{`
        .container1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          // background-color: red
        }
        .under-construction-img {
          width: 40vw;
          height: 100%;
          margin: 5% 2.5%;
        }
        .under-container1 {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
        .under-container1-txt {
          margin: 0 0.5em;
          display: flex;
          flex-direction: column;
          text-align: right;
        }
        .under-container1-txt h5{
          margin-top: -1vw
        }

        @media screen and (max-width: 600px) {
          .under-construction-img {
            width: 85vw;
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default withTranslation(['home', 'common'])(inject("store")(observer(UnderConstruction)))
