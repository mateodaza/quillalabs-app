import { withTranslation } from '../../i18n'
import Link from 'next/link'

function Footer({t, i18n}) {
  return (
    <footer className="footer">
      <Link href="/">
        <a>QuillaLabs - 2020</a>
      </Link>
    <style jsx>{`
      .footer {
        display: flex;
        padding: 2% 5%;
        justify-content: flex-end;
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