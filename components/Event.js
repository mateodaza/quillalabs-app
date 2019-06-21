import { observer, inject } from "mobx-react";
import Head from 'next/head'
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import Router, { withRouter } from 'next/router'
// import { Router } from '../routes'
import colors from '../common/colors';

const PRICE = 10000

const EpayBtn =(props)=> (
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
      data-epayco-external='false' 
      data-epayco-response={`${props.origin}/payment_confirmation?qty=${props.qty}&price=${props.price}`} 
      data-epayco-confirmation={`${props.origin}/payment_confirmation?qty=${props.qty}&price=${props.price}`}
      data-epayco-button='https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn2.png'> 
    </script> 
  </form>
)

@inject("store")
@observer
class Event extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      ssrDone: false,
      origin: null
    }
  }

  login=(e)=> {
    const { client } = this.props
    e.preventDefault();
    Router.push({pathname: '/signin', query: { event: this.props.event }})
  }

  signup=(e)=> {
    const { client } = this.props
    e.preventDefault();
    Router.push({pathname: '/create-account', query: { event: this.props.event }})
  }

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

  componentDidMount() {
    this.setState({ ssrDone: true, origin: window.location.origin})
  }

  render() {
    const { ssrDone, origin } = this.state
    const { store, event, router } = this.props
    let image = ''
    let isLogged = store.authStore.isLogged
    console.log( origin)
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
          {
            isLogged ? (
              event === 'maker' && ssrDone && ( <div className="options"> <EpayBtn origin={origin} price={PRICE} qty={1}/> </div>)
            ): (
              <div className="options">
                <div className="option-box">
                  <h4>Inicia sesión o registrate para adquirir tu entrada!</h4>
                  <div className="btns">
                    <button className="btn" onClick={this.login}>Inicia Sesión</button>
                    <button className="btn" onClick={this.signup}>Registrate</button>
                  </div>
                </div>
              </div>
            )
          }
          <img src={image}/>
          {
            // event === 'maker' && (
            //   <button onClick={this.goCheckout}
            //     className="button" style={{width: '25%'}}>Adquiere tu entrada!</button>
            // )
          }
        </div>

        <style jsx>{`
          form {
            margin: 25px 0 0 0;
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5% 0;
          }
          h4 {
            color: ${colors.black3}
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
          .options {
            flex: 5;
            padding: 20px 10%;
            margin: 0 0 5% 0;
            border-bottom: 1px solid ${colors.black3};
          }
          .option-box {
            display: flex;
            flex-direction: column;
            align-items: center
          }
          .btns {
            display: flex;
            margin: 2% 0 0 0;
            flex-direction: row
          }
          .btn {
            margin: 15px 20px;
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
          .btn:hover {
            opacity: 1;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
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

export default withApollo(withRouter(Event))
