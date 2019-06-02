import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

const CREATE_USER = gql`
  mutation Create($name: String!, $email: String!, $password: String!) {
    createUser(
      username: $name
      authProvider: { credentials: { email: $email, password: $password } }
    ) {
      token
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
class RegisterBox extends React.Component{
  render() {
    const { store, client } = this.props
    let name, email, password
    return (
      <Mutation
        mutation={CREATE_USER}
        onCompleted={data => {
          // Store the token in cookie
          console.log({data})
          document.cookie = cookie.serialize('token', data.createUser.token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
  
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
        {(create, { data, error }) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
  
              create({
                variables: {
                  name: name.value,
                  email: email.value,
                  password: password.value
                }
              })
  
              name.value = email.value = password.value = ''
            }}
          >
            {error && <p>Issue occurred while registering :(</p>}
            <input
              name='name'
              placeholder='Name'
              ref={node => {
                name = node
              }}
            />
            <br />
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
            <button className="button">Register</button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default withApollo(RegisterBox)
