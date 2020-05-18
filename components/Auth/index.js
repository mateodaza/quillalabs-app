import { inject, observer } from 'mobx-react'
import SignIn from './Signin'
import Register from './Register'
import Layout from '../shared/Layout'
import AuthLayout from './AuthLayout'

function Auth({ store, type }) {
  const { authStore } = store
  
  let toShow = null
  if(type === 'login') {
    toShow = <SignIn />
  }else if(type === 'register') {
    toShow =  <Register />
  }

  return (
    <div>
     <AuthLayout>
      <Layout noHeader>
      {toShow}
      </Layout>
     </AuthLayout>  
      <style jsx>{`

      `}</style>
    </div>
  )
}

export default inject("store")(observer(Auth))
