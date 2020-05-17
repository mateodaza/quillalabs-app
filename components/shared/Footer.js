import { withTranslation } from '../../i18n'
import Link from 'next/link'

function Footer(props) {

  const { t, i18n } = props
  const lan = i18n.language === 'en' ? 'es' : 'en'
  return (
    <footer className="footer">
      <a
        className='lng-btn'
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      >
        {lan}
      </a>
      <Link href="/">
        <a>QuillaLabs - 2020</a>
      </Link>
    <style jsx>{`
      .footer {
        display: flex;
        padding: 2% 5%;
        justify-content: space-between;
        left: 0;
        bottom: 0;
        width: 100%;
        color: white;
        text-align: center;
      }
    `}</style>
  </footer>
  )
}

export default withTranslation(['common'])(Footer)