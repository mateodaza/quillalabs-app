import { observer, inject } from "mobx-react";
import Router from 'next/router'
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
    const { withHeader, store } = this.props
    // console.log({store})
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
          <div>
          {
            !store.authStore.isLogged ? (
              <a href="#" onClick={this.login}>
                <p>Signin</p>
              </a>
            ): (
              <a href="#" onClick={this.logout}>
                <p>Logout</p>
              </a>
            )
          }
          </div>
        </div>      
        <style jsx>{`
        a{
          color: ${colors.black}
        }
        a:focus { 
          text-decoration: none;
        }
        .header-container{
          display: flex;
          justify-content: space-between;
          margin: 5% 2%;
        }
      `}</style>
      </header>
    )
  }
}

export default withApollo(Header)
