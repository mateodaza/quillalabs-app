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

  render() {
    const { store, client } = this.props
    let email, password
    return (
      <Mutation
        mutation={SIGN_IN}
        onCompleted={data => {
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

              signinUser({
                variables: {
                  email: email.value,
                  password: password.value
                }
              })

              email.value = password.value = ''
            }}
          >
            {error && <p>No user found with that information.</p>}
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
            <button className="button">Sign in</button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default withApollo(SigninBox)
