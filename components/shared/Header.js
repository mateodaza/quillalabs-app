import { observer, inject } from "mobx-react";
import { Router }  from '../../routes'
import { Link } from '../../routes'
import { withRouter } from 'next/router'
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
    const { withHeader, store, store: {authStore}, router  } = this.props
    let route = null
    if(router.pathname === '/signin' || router.pathname === '/create-account' ) {
      route = true
    }
    console.log({router})
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
            !store.authStore.isLogged? (
              !route && (
                <button className="signin-btn" onClick={this.login}>Inicia Sesión</button>
              )
            ): (
              <div style={{display: 'flex', flexDirection: 'column', justifyItems: 'flex-end'}}>
                <p>Hola, {authStore.auth.signInUser.user.username}!</p>
                <button className="signin-btn" onClick={this.logout}>Salir</button>
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
          color: rgba(37, 41, 46, 1);
          font-size: 18px;
        }
        .signin-btn {
          background-color: rgba(37, 41, 46, 1);
          box-shadow: 0 1px 2px rgba(0,0,0,0.25);
          cursor: pointer;
          border: none;
          border-radius: 8px;
          color: white;
          padding: 8px 16px;
          text-align: center;
          font-size: 14px;
          opacity: 0.9;
          transition: box-shadow 0.3s ease-in-out;
        }
        .signin-btn:hover {
          opacity: 1;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .header-container{
          display: flex;
          justify-content: space-between;
          margin: 4% 2% 0 2%;
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

export default withApollo(withRouter(Header))
