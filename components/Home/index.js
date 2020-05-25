import { inject, observer } from 'mobx-react'

import UnderConstruction from './UnderConstruction1'
import Layout from '../shared/Layout'

function Home({store}) {
  const { authStore } = store

  return (
    <Layout>    
      <UnderConstruction />
      <style jsx>{`

      `}</style>

      <style jsx global>{`
      
      `}</style>
    </Layout>
  )
}

export default inject("store")(observer(Home))
