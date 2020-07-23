import About from '../components/About'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'


function AboutPage({user}) {
  return (
    <About />
  )
}

AboutPage.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default withTranslation('common')(AboutPage)
