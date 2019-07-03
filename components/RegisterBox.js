import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'
import { Router } from '../routes'

const CREATE_USER = gql`
  mutation Create($firstname: String!, $lastname: String!, $username: String!, $phone: String!, $email: String!, $password: String!) {
    createUser(
      username: $username
      authProvider: { credentials: { 
        firstName: $firstname,
        lastName: $lastname,
        phone: $phone,
        email: $email, 
        password: $password,
      } }
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

  powerMsg =(val)=> {
    const values = {"low": "Baja seguridad", "medium": "Mediana seguridad", "strong": "Alta Seguridad"}
    return values[val]
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
    let name, lastname, username, phone, email, password, password2
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

          let route = '/'
          if(router && router.query && router.query.event){
            route = `/event/${router.query.event}`
          }
          if (typeof window !== 'undefined') {
            window.location.replace(route)
            // Router.pushRoute(route)
          }else {
            client.cache.reset().then(() => {
              redirect({}, route)
            })
            // Router.push({pathname: route})
            Router.pushRoute(route)
          }
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
              if(name.value && lastname.value && username.value && phone.value && email.value && password.value && password2.value) {
                if(!/\s/.test(username.value)) {
                  if(password.value === password2.value) {
                    if(this.validateEmail(email.value)) {
                      if(this.validatePassword(password.value) !== 'low') {
                        create({
                          variables: {
                            username: username.value,
                            firstname: name.value,
                            lastname: lastname.value,
                            phone: phone.value,
                            email: email.value,
                            password: password.value
                          }
                        })
                        // name.value = lastname.value = email.value = password.value = password2.value = ''
                        // phone.value = username.value = ''
                      }else {
                        this.setState({errorMsg: 'Contraseña muy débil'})
                      }
                    }else {
                      this.setState({errorMsg: 'Formato de e-mail no es valido'})
                    }
                  }else {
                    this.setState({errorMsg: 'Contraseñas no coinciden'})
                  }
                } else {
                  this.setState({errorMsg: 'Nombre de usuario contiene espacios'})
                }
              }else {
                this.setState({errorMsg: 'Hacen falta campos'})
              }
            }}
          >
            <h1>Registro</h1>
            <input
              name='name'
              placeholder='Nombre'
              ref={node => {
                name = node
              }}
            />
            <br />
            <input
              name='lastname'
              placeholder='Apellido'
              ref={node => {
                lastname = node
              }}
            />
            <br />
            <input
              name='username'
              placeholder='Nombre de Usuario'
              ref={node => {
                username = node
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
              name='phone'
              placeholder='Celular'
              ref={node => {
                phone = node
              }}
            />
            <br />
            <input
              name='password'
              placeholder='Contraseña'
              onChange={this.validatePassword}
              ref={node => {
                password = node
              }}
              type='password'
            />
            {
              pwdPower ? <p>{this.powerMsg(pwdPower)}</p>:<br />
            }
            <input
              name='password2'
              placeholder='Verificación Contraseña'
              ref={node => {
                password2 = node
              }}
              type='password'
            />
            {errorMsg && ( <p style={{color: 'red'}}>{errorMsg}</p> ) }
            {error && (<p>Error 😯 {error.graphQLErrors[0].message}</p> )}
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
