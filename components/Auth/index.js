import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { useToasts } from 'react-toast-notifications'
import SignIn from './Signin'
import Register from './Register'
import Layout from '../shared/Layout'
import Router from 'next/router'
import AuthLayout from './AuthLayout'

function Auth({ store, type }) {
  const { authStore } = store
  const { isLogged } = authStore
  const { addToast } = useToasts()

  let toShow = null
  if(type === 'login') {
    toShow = <SignIn />
  }else if(type === 'register') {
    toShow =  <Register />
  }

  useEffect(() => {
    if(isLogged) {
      addToast('You are already logged in', { appearance: 'info', })
      Router.push("/")
    }
  }, []);

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
