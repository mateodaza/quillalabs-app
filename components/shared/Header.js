import Link from 'next/link'
import colors from '../../common/colors'
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { logos } from '../../lib/images'

function Header(props) {
  const { store, t } = props
  const { authStore } = store

  return (
    <div>
      <div className="header">
        <Link href="/"><a>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
            <img src={logos.basic} width='50px' height='50px'/>
            <p style={{fontSize: '1.2em', margin:'5%'}}>QUILLALABS</p>
          </div>
        </a></Link>
        <Link href="/login">
          <button className="button-large login-btn">{t('login')}</button>
        </Link>
      </div>
      <style jsx>{`
        button {
          background-color: white;
          color: ${colors.black};
        }
        .header {
          display: flex;
          flex: 1;
          padding: 2.5% 2% 0 2%;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        @media (max-width: 40.0rem) { 
          .header {
            flex-direction: column;
            align-items: center;
            padding: 5% 0 
          }
          .login-btn {
            margin: 10% 0 0 0;
          }
        }

        @media (max-width: 80.0rem) {

        }
      `}</style>
    </div>
  )
}

const App = inject("store")(observer(Header))
export default withTranslation(['common'])(App)