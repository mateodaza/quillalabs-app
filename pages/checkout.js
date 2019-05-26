import { Link } from '../routes'
import redirect from '../lib/redirect'
import { withRouter } from 'next/router'
import Layout from '../components/shared/Layout'
import CheckoutPage from '../components/Checkout'

class Checkout extends React.Component {

  static async getInitialProps (context) {
    return {}
  }

  render () {
    const { name } = this.props.router.query
    return (
      <Layout>
        <CheckoutPage />
      </Layout>
    )
  }
}

export default withRouter(Checkout)
