import { withTranslation } from '../../i18n'

function Footer(props) {

  const { t, i18n } = props
  const lan = i18n.language === 'en' ? 'es' : 'en'
  return (
    <footer className="container footer">
      <a
        className='lng-btn'
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      >
        {lan}
      </a>
      <p>QuillaLabs - 2020</p>
    <style jsx>{`
      .footer {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    `}</style>
  </footer>
  )
}

export default withTranslation(['common'])(Footer)