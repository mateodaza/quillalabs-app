import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import { Router } from '../routes'
import colors from '../common/colors'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

const SIGN_IN = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      token,
      user {
        id
        email,
        username
      }
    }
  }
`

@inject("store")
@observer
class SigninBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null
    }
  }

  render() {
    const { store, client, router } = this.props
    const { errorMsg } = this.state
    let email, password
    return (
      <Mutation
        mutation={SIGN_IN}
        onCompleted={async data => {
          if(data.signInUser) {
            // console.log({data})
          // Store the token in cookie
            document.cookie = cookie.serialize('token', data.signInUser.token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })
            // console.log(document.cookie)
            
            //update store
            await store.authStore.login(data.signInUser)
            // Force a reload of all the current queries now that the user is
            // logged in
            let route = '/'
            console.log({router})
            if(router && router.query ){
              if(router.query.event){
                route = `/event/${router.query.event}`
              }else if(router.query.redirect){
                route = `/${router.query.redirect}`
              }
            }
            if (typeof window !== 'undefined') {
              if(route !== "/") {
                Router.pushRoute(route)
              }else {
                window.location.replace(route)
              }
            }else {
              client.cache.reset().then(() => {
                redirect({}, route)
              })
              // Router.push({pathname: route})
              Router.pushRoute(route)
            }
          }else {
            this.setState({errorMsg: 'Credenciales incorrectas'})
          }
        }}
        onError={error => {
          // If you want to send error to external service?
          console.log(error)
        }}
      >
        {(signinUser, { data, error }) => (
          <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              if(email.value && password.value) {
                signinUser({
                  variables: {
                    email: email.value,
                    password: password.value
                  }
                })
                email.value = password.value = ''
              }else {
                this.setState({errorMsg: 'Campos incompletos'})
              }
            }}
          >
            {error && <p>No existe un usuario con esta información.</p>}
            {errorMsg && <p style={{margin: '5% 0 0 0', color: 'red'}}>{errorMsg}</p>}
            <h1>Inicia Sesión</h1>
            <input
              name='email'
              placeholder='Email'
              ref={node => {
                email = node
              }}
            />
            <br />
            <input
              name='password'
              placeholder='Password'
              ref={node => {
                password = node
              }}
              type='password'
            />
            <br />
            <button className="button">Ingresa</button>
            
          </form>
          <style jsx>{`
            h1 {
              color: rgba(37, 41, 46, 0.6);
              margin: 0 0 2% 0;
            }
            form {
              display: flex;
              flex: 5;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            input {

            }
          `}</style>
          </div>
        )}
      </Mutation>
    )
  }
}

export default withApollo(withRouter(SigninBox))
