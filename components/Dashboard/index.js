import { inject, observer } from 'mobx-react'
import Layout from '../shared/Layout'

function Dashboard({store}) {
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

export default Dashboard
