import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
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
    const { store, client } = this.props
    const { errorMsg } = this.state
    let email, password
    return (
      <Mutation
        mutation={SIGN_IN}
        onCompleted={data => {
          if(data.signInUser) {
          // Store the token in cookie
            document.cookie = cookie.serialize('token', data.signInUser.token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })
            // console.log(document.cookie)
            
            //update store
            store.authStore.login(data)
            // Force a reload of all the current queries now that the user is
            // logged in
            client.cache.reset().then(() => {
              redirect({}, '/')
            })
          }else {
            this.setState({errorMsg: 'User doesnt exist'})
          }
        }}
        onError={error => {
          // If you want to send error to external service?
          console.log(error)
        }}
      >
        {(signinUser, { data, error }) => (
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
                this.setState({errorMsg: 'Fields missing'})
              }
            }}
          >
            {error && <p>No existe un usuario con esta información.</p>}
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
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
        )}
      </Mutation>
    )
  }
}

export default withApollo(SigninBox)
