import { inject, observer } from 'mobx-react'
import { useState, useEffect } from 'react'
import { random } from '../../lib/images'

function AuthLayout({ children, store }) {
  const { authStore } = store
  const bgImage = random.eth_art_1

  return (
    <div>  
      <section className="split left"/>
      <section className="split right">
      {children}
      </section>
      <style jsx>{`
        .split {
          height: 100%;
          position: fixed;
          z-index: 1;
          top: 0;
          overflow-x: hidden;
          padding-top: 20px;
        }
        
        .left {
          left: 0;
          width: 40%;
          background: url(${bgImage});
          background-repeat: no-repeat;
          background-position: bottom right;
          background-size: cover;
        }
        .right {
          width: 60%;
          right: 0;
          padding: 0 2%
        }

        @media (max-width: 50.0rem) { 
          .left {
            width: 0%
          }
          .right {
            width: 100%;
            left: 0
          }
        }
      `}</style>
    </div>
  )
}

export default inject("store")(observer(AuthLayout))
