import { observer, inject } from "mobx-react";
import { withApollo } from 'react-apollo'
import redirect from '../../lib/redirect'
import logo from '../../assets/logo.svg'

@inject("store")
@observer
class Header extends React.Component{


  handleClick=(e)=> {
    const { client } = this.props
    e.preventDefault();
    client.cache.reset().then(() => {
      redirect({}, '/signin')
    })
    console.log('The link was clicked.');
  }

  render() {
    const { withHeader, store } = this.props
    console.log({store})
    return (
      <header>
        <div className="header-container">
          <div>
            <img src={logo} width='150px' height='150px'/>
          </div>
          <div>
            <a href="#" onClick={this.handleClick}>
              <p>Login</p>
            </a>
          </div>
        </div>      
        <style jsx>{`
        a {
          text-decoration: none;
        }
        .header-container{
          display: flex;
          justify-content: space-between;
          padding: 5% 10%
        }
      `}</style>
      </header>
    )
  }
}

export default withApollo(Header)
