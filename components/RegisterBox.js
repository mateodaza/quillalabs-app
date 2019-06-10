import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'
import Router from 'next/router'

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
      errorMsg: null,
      pwdPower: null
    }
  }
  
  setError =(type)=> {
    if(type === 'Invalid Input Email is invalid') {
      return 'E-mail no es válido'
    } else {
      return 'GraphQL Error'
    }
  }

  validateEmail =(email)=> {
    return /\S+@\S+\.\S+/.test(email);
  }

  validatePassword =(event)=> {
    let pwd = event
    event.target && ( pwd = event.target.value )
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    let pwdPower = 'low'
    if(strongRegex.test(pwd)){
      pwdPower = 'strong'
    }else if(mediumRegex.test(pwd)) {
      pwdPower = 'medium'
    }
    this.setState({pwdPower})
    return pwdPower
  }

  render() {
    const { store, client, router } = this.props
    const { errorMsg, pwdPower } = this.state
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
          store.authStore.login(data.createUser)

          // Force a reload of all the current queries now that the user is
          // logged in
          client.cache.reset().then(() => {
            // check if it comes from event page
            const fromRoute = router.query.event
            let toRoute = '/'
            console.log({fromRoute})
            fromRoute !== undefined &&(toRoute = `/checkout/${fromRoute}`);
            Router.push(toRoute)
          })
        }}
        onError={error => {
          // If you want to send error to external service?
          console.log({error})
        }}
      >
        {(create, { data, error }) => (
          <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              if(name.value && email.value && password.value && password2.value) {
                if(password.value === password2.value) {
                  if(this.validateEmail(email.value)) {
                    if(this.validatePassword(password.value) !== 'low') {
                      create({
                        variables: {
                          name: name.value,
                          email: email.value,
                          password: password.value
                        }
                      })
                      name.value = email.value = password.value = password2.value = ''
                    }else {
                      this.setState({errorMsg: 'Password muy debil'})
                    }
                  }else {
                    this.setState({errorMsg: 'Formato de e-mail no es valido'})
                  }
                }else {
                  this.setState({errorMsg: 'Passwords no coinciden'})
                }
              }else {
                this.setState({errorMsg: 'Hacen falta campos'})
              }
            }}
          >
            <h1>Registro</h1>
            <input
              name='name'
              placeholder='Nombre de Usuario'
              ref={node => {
                name = node
              }}
            />
            <br />
            <input
              name='email'
              placeholder='E-mail'
              ref={node => {
                email = node
              }}
            />
            <br />
            <input
              name='password'
              placeholder='Password'
              onChange={this.validatePassword}
              ref={node => {
                password = node
              }}
              type='password'
            />
            {
              pwdPower ? <p>{pwdPower}</p>:<br />
            }
            <input
              name='password2'
              placeholder='Verificación Password'
              ref={node => {
                password2 = node
              }}
              type='password'
            />
            <br />
            {errorMsg && ( <p style={{color: 'red'}}>{errorMsg}</p> ) }
            {error && (<p>Error 😯 {this.setError(error.graphQLErrors[0].message)}</p> )}
            <button className="button">Sign up</button>
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

export default withRouter(withApollo(RegisterBox))
