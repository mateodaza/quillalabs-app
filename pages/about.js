import About from '../components/About'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function AboutPage({user}) {
  return (
    <About />
  )
}

About.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
    mobileCheck: mobileCheck(ctx)
  }
}

const AboutComponent = withAuthComponent(withTranslation('common')(AboutPage))
export default inject("store")(observer(AboutComponent))
export const getServerSideProps = withAuthServerSideProps(About.getInitialProps);