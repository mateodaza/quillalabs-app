import { useEffect, useRef, useState, Fragment } from 'react'
import Link from 'next/link'
import colors from '../../common/colors'
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { logos } from '../../lib/images'

function Header(props) {
  const { store, i18n, t } = props
  const { authStore } = store
  const { isLogged } = authStore
  const lan = i18n.language === 'en' ? 'ESP' : 'ENG'

  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
        <div className="header"  id="myHeader">
          <a
            className='lng-btn'
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
          >
            {lan}
          </a>
          <Link href="/"><a>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <img src={logos.basic} width='50px' height='50px'/>
              <p style={{fontSize: '1.2em', margin:'5%'}}>QUILLALABS</p>
            </div>
          </a></Link>
          {
            isLogged ? (
              <Link href="/dashboard">
                <button className="button-large login-btn">Dashboard</button>
              </Link>
            ): (
              <Link href="/login">
                <button className="button-large login-btn">{t('login')}</button>
              </Link>
            )
          }
        </div>
      </div>
      <style jsx>{`
        button {
          background-color: white;
          color: ${colors.black};
        }
        .header {
          display: flex;
          padding: 4% 2% 2% 2%;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: null;
          // border-bottom: 1px solid lightgray;
          box-shadow: 0px 6px 50px -11px rgba(0,0,0,0.14);
          -webkit-box-shadow: 0px 6px 50px -11px rgba(0,0,0,0.14);
          -moz-box-shadow: 0px 6px 50px -11px rgba(0,0,0,0.14);
        }

        .sticky-wrapper {
          position: relative;
        }

        .sticky {
          position: sticky;
          top: 0;
          z-index: 100; /* this is optional and should be different for every project */
        }
        
        .sticky .sticky-inner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }

        .lng-btn {
          position: absolute;
          background-color: transparent;
          top: 0;
          right: 0;
          z-index: 1;
          padding: 0.5% 2.5% 0 0;
        }

        @media (max-width: 40.0rem) { 
          .header {
            flex-direction: column;
            align-items: center;
            padding: 10% 0 
          }
          .login-btn {
            margin: 10% 0 0 0;
          }
        }

        @media (max-width: 80.0rem) {

        }
      `}</style>
    </Fragment>
  )
}

const App = inject("store")(observer(Header))
export default withTranslation(['common'])(App)