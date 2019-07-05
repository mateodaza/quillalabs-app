import { observer, inject } from "mobx-react";
import { Link } from '../../routes'
import Router, { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'
import colors from '../../common/colors'
import cookie from 'cookie'
import redirect from '../../lib/redirect'
import logo from '../../assets/logo.png'

@inject("store")
@observer
class Header extends React.Component{


  login=(e)=> {
    const { client } = this.props
    e.preventDefault();
    // client.cache.reset().then(() => {
    //   redirect({}, '/signin')
    // })
    Router.push({pathname: '/signin'})
  }

  logout=(e)=> {
    const { client, store } = this.props
    e.preventDefault();
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })
    store.authStore.logout()
    
    if (typeof window !== 'undefined') {
      window.location.replace('/')
    }else {
      client.cache.reset().then(() => {
        redirect({}, '/')
      })
      Router.push({pathname: '/'})
    }
    
  }

  goHome=()=>{
    const { client } = this.props
    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  goTickets=()=>{
    const { client } = this.props
    client.cache.reset().then(() => {
      redirect({}, '/tickets')
    })
  }

  render() {
    const { withHeader, store, store: {authStore}, router  } = this.props
    let route = false
    let notHome = false
    if(router.pathname === '/signin' || router.pathname === '/create-account' || router.pathname === '/event' ) {
      route = true
    }
    if(router.pathname !== '/') {
      notHome = true
    }
    console.log({router, authStore})
    return (
      <header>
        <div className="header-container">
          <a href="/">
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <img src={logo} width='100px' height='100px'/>
              {
                notHome && ( <p style={{margin:'15px 0 0 0'}}>QUILLALABS</p> )
              }
            </div>
          </a>
          <div className="right-side">
          {
            !store.authStore.isLogged? (
              !route && (
                <button className="signin-btn" onClick={this.login}>Inicia Sesión</button>
              )
            ): (
              // <div className="user-container">
              //   <div className="user-dot">
              //     <div className="dot" />
              //     <p>{authStore.auth && authStore.auth.user.username}</p>
              //   </div>
              //   <div>
              //     <button className="signin-btn" onClick={this.logout}>Salir</button>
              //   </div>
              // </div>
              <ul className="menu">
                <li>
                  <div className="user-dot">
                    <div className="dot" />
                    <p>{authStore.auth && authStore.auth.user && authStore.auth.user.username}</p>
                  </div>
                  <ul>
                    <li className="item"><Link route='tickets'><a>Tickets</a></Link></li>
                    <li><button className="signin-btn" onClick={this.logout}>Cerrar Sesión</button></li>
                  </ul>
                </li>
              </ul>
            )
          }
          </div>
        </div>
        <style jsx>{`
        a{
          color: white;
          cursor: pointer;
        }
        a:focus {
          text-decoration: none;
        }
        p {
          color: rgba(37, 41, 46, 1);
          font-size: 18px;
        }
        .signin-btn {
          width: 100%;
          margin: 15px 0;
          background-color: ${colors.white};
          box-shadow: 0 1px 2px rgba(0,0,0,0.25);
          cursor: pointer;
          border: none;
          border-radius: 8px;
          color: rgba(37, 41, 46, 1);
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
          flex-direction: row;
          justify-content: space-between;
          margin: 4% 2% 0 5%;
        }
        .right-side {
          align-items: flex-start;
        }
        .user-container {
          display: flex;
          flexDirection: column;
          alignItems: flex-end;
        }
        .user-dot {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 10px 10px 10px;
          border-bottom: 1px solid ${colors.black3};
        }
        .dot {
          height: 30px;
          width: 30px;
          margin-right: 10px;
          background: rgb(249,168,133); /* Old browsers */
          background: -moz-linear-gradient(-45deg, rgba(249,168,133,1) 0%, rgba(247,174,114,1) 9%, rgba(127,151,211,1) 88%); /* FF3.6-15 */
          background: -webkit-linear-gradient(-45deg, rgba(249,168,133,1) 0%,rgba(247,174,114,1) 9%,rgba(127,151,211,1) 88%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(135deg, rgba(249,168,133,1) 0%,rgba(247,174,114,1) 9%,rgba(127,151,211,1) 88%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f9a885', endColorstr='#7f97d3',GradientType=1 );
          border-radius: 50%;
        }

        li {
          list-style-type: none;
        }

        .menu {
          display: block;
          margin: 0 auto;
          position: relative;
          margin-bottom: 100px;
        }

        .menu > li > a {
          background: transparent;
          color: black;
          display: block;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
        }

        .menu ul {
          background: transparent;
          height: 0;
          left: 0;
          opacity: 0;
          position: absolute;
          transition: all .5s ease;
          top: 50px;
          width: 100%;
        }

        .menu li:hover ul {
          opacity: 1;
          transform: translateY(0);
        }

        .menu ul a {
          width: 100%;
          color: #000;
          display: block;
          padding: 5px 0;
          border-bottom: 1px solid lightgray;
        }

        @media only screen and (max-width: 600px) {
          p {
            font-size: 20px
          }
          img {
            margin: 5% 0 0 0;
          }
          .menu {
            width: 100%;
          }
          .menu li ul {
            height: 200px;
            opacity: 1;
            transform: translateY(0);
          }
          .user-container {
            flex-direction: row;
            justify-content: space-between
          }
          .header-container{
            margin: 4% 2px;
            align-items: center;
            flex-direction: column
          }
          .right-side {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: row;
            margin: 15px 0 0 0;
            padding: 12% 0;
          }
          .item{
            margin: 5px 15px;
          }
        }
      `}</style>
      </header>
    )
  }
}

export default withApollo(withRouter(Header))
