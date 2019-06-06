import { observer, inject } from "mobx-react";
import { Router }  from '../../routes'
import { Link } from '../../routes'
import { withApollo } from 'react-apollo'
import colors from '../../common/colors'
import cookie from 'cookie'
import redirect from '../../lib/redirect'
import logo from '../../assets/logo.svg'

@inject("store")
@observer
class Header extends React.Component{


  login=(e)=> {
    const { client } = this.props
    e.preventDefault();
    client.cache.reset().then(() => {
      redirect({}, '/signin')
    })
  }

  logout=(e)=> {
    const { client, store } = this.props
    e.preventDefault();
    console.log({document})
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })
    store.authStore.logout()
    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  goHome=()=>{
    const { client } = this.props
    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  render() {
    const { withHeader, store, store: {authStore}  } = this.props
    console.log({authStore})
    return (
      <header>
        <div className="header-container">
          <Link route='index'>
            <a onClick={this.goHome}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <img src={logo} width='150px' height='150px'/>
                <div style={{alignSelf: 'center'}}>
                  <h1>QuillaLabs</h1>
                </div>
              </div>
            </a>
          </Link>
          <div className="right-side">
          {
            !store.authStore.isLogged ? (
              <div className="signin-btn">
                <a href="" onClick={this.login}>
                  <p>Inicia sesión</p>
                </a>
              </div>
            ): (
              <div>
                <p>Hola, {authStore.auth.signInUser.user.username}!</p>
                <a style={{}} href="" onClick={this.logout}>
                  <p style={{textAlign: 'right'}}>Salir</p>
                </a>
              </div>
            )
          }
          </div>
        </div>      
        <style jsx>{`
        a{
          color: white;
        }
        a:focus { 
          text-decoration: none;
        }
        p {
          color: white;
          font-size: 18px;
          background-color: rgba(37, 41, 56, 1)
        }
        .signin-btn {
          padding: 2px 5px;
          background-color: rgba(37, 41, 56, 1)
        }
        .header-container{
          display: flex;
          justify-content: space-between;
          margin: 5% 2%;
        }
        .right-side {
          padding: 5% 5% 0 0
        }

        @media only screen and (max-width: 600px) {
          p {
            font-size: 20px
          }
          .header-container{
            flex-direction: column
          }
          .right-side {
            padding: 12%;
          }
        }
      `}</style>
      </header>
    )
  }
}

export default withApollo(Header)
