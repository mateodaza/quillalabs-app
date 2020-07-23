import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import Layout from '../shared/Layout'
import WithAuth from '../../lib/withAuth'

function Dashboard({store, t}) {
  const { authStore } = store
  return (
    <Layout>    
      <h3>Hello, this is your dashboard</h3>
      <button onClick={()=>authStore.logoutUser()}>logout</button>
      <style jsx>{`

      `}</style>

      <style jsx global>{`
      
      `}</style>
    </Layout>
  )
}

const component = WithAuth(Dashboard)
export default withTranslation('common')(component)
