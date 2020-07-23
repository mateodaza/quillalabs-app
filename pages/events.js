import Events from '../components/Events'
import { withTranslation } from '../i18n'
import mobileCheck from '../lib/mobileCheck'
import { inject, observer } from 'mobx-react'

function EventsView({user, mobileCheck}) {
  return (
    <Events mobileCheck/>
  )
}

EventsView.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: ['common'],
    mobileCheck: mobileCheck(ctx)
  }
}

export default withTranslation('common')(EventsView)
