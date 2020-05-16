import Link from 'next/link'
import colors from '../../common/colors'
import { withTranslation } from '../../i18n'
import { inject, observer } from 'mobx-react'
import { logos } from '../../lib/images'

function Header(props) {
  const { store, t } = props
  const { authStore } = store

  return (
    <div className="header">
      <Link href="/"><a>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <img src={logos.basic} width='50px' height='50px'/>
          <p style={{fontSize: '1.2em', margin:'5%'}}>QUILLALABS</p>
        </div>
      </a></Link>
      <Link href="/login">
        <button className="button-large">{t('login')}</button>
      </Link>
      <style jsx>{`
        button {
          background-color: white;
          color: ${colors.black};
        }
        .header {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

const App = inject("store")(observer(Header))
export default withTranslation(['common'])(App)