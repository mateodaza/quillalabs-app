import Events from '../components/Events'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

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

const EventsComponent = inject("store")(observer(EventsView))
export default withTranslation('common')(EventsComponent)
