import { inject, observer } from 'mobx-react'
import { random } from '../../lib/images'
import Layout from '../shared/Layout'

function About({store}) {
  const { isMobile } = store.authStore
  return (
    <Layout> 
      <div className="about-container">
        <img className="big-img" src={random.tomas_sanchez} />
      </div>   
      <style jsx>{`

      `}</style>

      <style jsx global>{`
        .about-container {
          display: flex;
          justify-content: center
        }
        .big-img {
          align-self: center;
          max-width: ${isMobile ? '90%': '70%'};
          height: auto;
        }
      `}</style>
    </Layout>
  )
}

export default inject("store")(observer(About))
