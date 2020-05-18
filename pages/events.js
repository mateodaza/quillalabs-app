import Events from '../components/Events'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function EventsView({user}) {
  return (
    <Events />
  )
}

Events.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
    mobileCheck: mobileCheck(ctx)
  }
}

const EventsComponent = withAuthComponent(withTranslation('common')(EventsView))
export default inject("store")(observer(EventsComponent))
export const getServerSideProps = withAuthServerSideProps(Events.getInitialProps);