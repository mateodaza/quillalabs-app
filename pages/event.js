import { Link } from '../routes'
import Layout from '../components/shared/Layout'
import SigninBox from '../components/SigninBox'

export default class Event extends React.Component {

  static async getInitialProps ({context, query}) {
    // query.slug

    return {}
  }

  render () {
    // this.props.url.query.slug
    return (
      <Layout>
        
      </Layout>
    )
  }
}
