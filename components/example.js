import { inject, observer } from 'mobx-react'
import Layout from '../shared/Layout'

function Example({store}) {
  const { authStore } = store
  return (
    <Layout>    
      
      <style jsx>{`

      `}</style>

      <style jsx global>{`
      
      `}</style>
    </Layout>
  )
}

export default inject("store")(observer(Home))
