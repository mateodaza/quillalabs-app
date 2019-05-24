import { Link } from '../routes'
import redirect from '../lib/redirect'
import { withRouter } from 'next/router'
import Layout from '../components/shared/Layout'
import EventPage from '../components/Event'

class Event extends React.Component {

  static async getInitialProps (context) {
    const name = context.query.name
    if(name !== 'botlatam' && name!=='startup' && name!=='maker') {
      redirect(context, '/')
    }
    return {}
  }

  render () {
    const { name } = this.props.router.query
    return (
      <Layout>
        <EventPage event={name}/>
      </Layout>
    )
  }
}

export default withRouter(Event)
