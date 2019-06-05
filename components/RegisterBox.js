import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
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

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null
    }
  }
  

  render() {
    const { store, client, router } = this.props
    const { errorMsg } = this.state
    let name, email, password, password2
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

          // check if it comes from event page
          const fromRoute = router.query.from
          let toRoute = '/'
          console.log({fromRoute})
          fromRoute &&(toRoute = `/checkout/${fromRoute.split('/')[2]}`);
          // Force a reload of all the current queries now that the user is
          // logged in
          client.cache.reset().then(() => {
            redirect({}, toRoute)
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
              if(name.value && email.value && password.value && password2.value) {
                if(password.value === password2.value) {
                  create({
                    variables: {
                      name: name.value,
                      email: email.value,
                      password: password.value
                    }
                  })
                  name.value = email.value = password.value = password2.value = ''
                }else {
                  this.setState({errorMsg: 'Passwords are different'})
                }

              }else {
                this.setState({errorMsg: 'Fields missing'})
              }
            }}
          >
            {error && <p>Issue occurred while registering :(</p>}
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
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
            <input
              name='password2'
              placeholder='Verify Password'
              ref={node => {
                password2 = node
              }}
              type='password'
            />
            <br />
            <button className="button">Sign up</button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default withRouter(withApollo(RegisterBox))
