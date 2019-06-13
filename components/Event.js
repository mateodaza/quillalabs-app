import { observer, inject } from "mobx-react";
import Head from 'next/head'
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import Router from 'next/router'
// import { Router } from '../routes'

@inject("store")
@observer
class Event extends React.Component{

  goCheckout =()=> {
    const { store, client } = this.props
    let route = '/create-account'
    if( store.authStore.isLogged ){ 
      route = `/checkout/${this.props.event}`
      Router.push(route)
    }else {
      Router.push({pathname: route, query: { event: this.props.event }})
    }
  }

  render() {
    const { event } = this.props
    let image = ''

    switch(event) {
      case 'startup':
        image = require("../assets/startupgrind.png")
        break;
      case 'botlatam':
        image = require("../assets/bot.png")
        break;
      case 'maker':
        image = require("../assets/flyer_test.jpeg")
        break;
      case 'cripto':
        image = require("../assets/lydtalk17.jpg")
        break;
      default:
        image = require("../assets/startupgrind.png")
        break;
    }

    return (
      <div>
        <Head>
          <title>QuillaLabs</title>
          <script type="text/javascript" src="https://checkout.epayco.co/checkout.js">   </script>
        </Head>
        <div className="container">
          <img src={image}/>
          {
            // event === 'maker' && (
            //   <button onClick={this.goCheckout}
            //     className="button" style={{width: '25%'}}>Adquiere tu entrada!</button>
            // )
          }
          <form>
            <script src='https://checkout.epayco.co/checkout.js' 
              data-epayco-key='344ff0f664418e0a5ac6ea89e3ec7619' 
              className='epayco-button' 
              data-epayco-amount='11900'  
              data-epayco-name='MKR-Meetup1_QuillaLabs' 
              data-epayco-description='MKR-Meetup1_QuillaLabs' 
              data-epayco-currency='COP'    
              data-epayco-country='CO' 
              data-epayco-test='true' 
              data-epayco-external='true' 
              data-epayco-response={`http://localhost:3000/payment_confirmation&qty=${1}&price=${5000}`} 
              data-epayco-confirmation={`http://localhost:3000/payment_confirmation&qty=${1}&price=${5000}`}
              data-epayco-button='https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn2.png'> 
            </script> 
          </form>
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
