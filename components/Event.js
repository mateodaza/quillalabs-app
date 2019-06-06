import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import { Router } from '../routes'

@inject("store")
@observer
class Event extends React.Component{

  goCheckout =()=> {
    const { store, client } = this.props
    let route = '/create-account'
    if( store.authStore.isLogged ){ 
      route = `/checkout/${this.props.event}`
    }
    // Router.push({pathname: route, query: { event: this.props.event }})
    Router.pushRoute(route)
  }

  render() {
    const { event } = this.props
    let image = ''
    console.log({event})

    switch(event) {
      case 'startup':
        image = require("../assets/startupgrind.png")
        break;
      case 'botlatam':
        image = require("../assets/bot.png")
        break;
      case 'maker':
        image = require("../assets/maker.jpg")
        break;
      default:
        image = require("../assets/startupgrind.png")
        break;
    }

    return (
      <div>
        <div className="container">
          <img src={image}/>
          {
            event === 'maker' && (
              <button onClick={this.goCheckout}
                className="button" style={{width: '25%'}}>Get Your Ticket!</button>
            )
          }
        </div>

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5% 0;
          }
          button {
            margin-top: 5%
          }
          img {
            align-self: center;
            max-width: 60%;
            height: auto;
            box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
          }
          @media ( max-width: 900px ) {
            img {
              max-width: 80%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withApollo(Event)
