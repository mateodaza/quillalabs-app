import Head from 'next/head'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import { random } from '../../lib/images'

import TextSlide from '../shared/TextSlide'
import Layout from '../shared/Layout'

function UnderConstruction(props) {
  const { t, store } = props
  const { authStore} = store
  const titles = [ 
    { text: t('get-to-know-us'), route: 'about' },
    { text: t('what-we-do'), route: 'events' }
  ]
  return (
    <div className="container">  
      <section className="row under-container1">
        <img src={random.rocket_under_construction} className="under-construction-img"
          alt="Photo by Austrian National Library on Unsplash"/>
        <div className="under-container1-txt">
          <h2>{t('under-const-title')}</h2>
          <TextSlide titles={titles}/>
        </div>
      </section>
      <style jsx>{`
        .under-construction-img {
          width: 45vw;
          height: 100%;
          margin: 10% 0;
        }
        .under-container1 {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-evenly;
        }
        .under-container1-txt {
          margin: 0 0 0 2vw;
          display: flex;
          flex-direction: column;
        }
        .under-container1-txt h5{
          margin-top: -1vw
        }

        @media (max-width: 40.0rem) { 
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
