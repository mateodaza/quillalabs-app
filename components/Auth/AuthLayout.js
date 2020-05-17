import { useState, useEffect } from 'react'
import { random } from '../../lib/images'

function AuthLayout({ children }) {
  const [mq, setMq] = useState(false);
  const [mobileCheck, setMobileCheck] = useState(false);

  const bgImage = random.spacex

  useEffect(() => {
    const mq = window.matchMedia( "(max-width: 40rem)" );
    console.log({mq})
    setMq(mq.matches)
    setMobileCheck(true)
  }, []);

  if(!mobileCheck) return null

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
          width: ${mq ? "0%" : "40%"};
          background: url(${bgImage});
          background-repeat: no-repeat;
          background-position: bottom right;
          background-size: cover;
        }
        .right {
          width: ${mq ? "100%" : "60%"};
          right: 0;
          padding: 0 2%
        }
      `}</style>
    </div>
  )
}

export default AuthLayout
