import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import './Checkout.scss'

import visa from 'payment-icons/min/flat/visa.svg';
import mastercard from 'payment-icons/min/flat/mastercard.svg';
import amex from 'payment-icons/min/flat/amex.svg';
import diners from 'payment-icons/min/flat/diners.svg';

@inject("store")
@observer
class Event extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tickets: 1
    }
  }


  addTicket =(val)=> {
    const { tickets } = this.state
    let sum = tickets + val
    if(sum > 0) {
      this.setState({tickets: sum})
    }
   }

  render() {
    let cardname, cardlastname, cardnumber, expmonth, expyear, cvv
    const { tickets } = this.state
    const { event } = this.props
    console.log('visa', visa)
    return (
      <div>
        <div className="container">
         <div className="col col-50">
            <h3>Payment</h3>
            <label htmlFor="fname"> </label>
            <div className="summary-container"
              style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div className="icon-container">
                <img src={visa} className="credit-icon"/>
                <img src={mastercard} className="credit-icon"/>
                <img src={amex} className="credit-icon"/>
                <img src={diners} className="credit-icon"/>
             </div>
             <div>
              <div style={{textAlign: 'center'}}>
                <p>
                  <a className="ticket-qty" onClick={()=>this.addTicket(-1)}>-</a>
                  {tickets}
                  <a className="ticket-qty" onClick={()=>this.addTicket(1)}>+</a>
                  Ticket
                </p>
                <div style={{margin: '12px 0 0 0'}}>
                  <p>TOTAL $COP {(10000*tickets).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </p>
                </div>
               </div>  
              </div>
            </div>
              <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()

                console.log({cardname: cardname.value})
                // PROCEED CHECKOUT
                cardname.value = cardlastname.value = cardnumber.value = expmonth.value = expyear.value = cvv.value = ''
              }}
            >
            <div className="row">
              <div className="col-25">
                <label htmlFor="cname">Nombre</label>
                <input type="text" id="cname" name="cardname" placeholder="Alice"
                  ref={node => {
                    cardname = node
                  }}
                />
              </div>
              <div className="col-25">
                <label htmlFor="cname">Apellido</label>
                <input type="text" id="clastname" name="cardlastname" placeholder="Doe"
                  ref={node => {
                    cardlastname = node
                  }}
                />
              </div>
            </div>
            <label htmlFor="ccnum">Número de tarjeta</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"
              ref={node => {
                cardnumber = node
              }}
            />

            <div className="row">
              <div className="col-25">
                <label htmlFor="expmonth">Mes</label>
                <input type="text" id="expmonth" name="expmonth" placeholder="01"
                  ref={node => {
                    expmonth = node
                  }}
                />
              </div>
              <div className="col-25">
                <label htmlFor="expyear">Año</label>
                <input type="text" id="expyear" name="expyear" placeholder="2019"
                  ref={node => {
                    expyear = node
                  }}
                />
              </div>
              <div className="col-25">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="352"
                  ref={node => {
                    cvv = node
                  }}
                />
              </div>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <button onClick={this.goCheckout}
              className="button" style={{textAlign: 'center', width: '35%'}}>Pagar</button>
            </div>
          </form>

          </div>

        </div>
      </div>
    )
  }
}

export default withApollo(Event)
