import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import redirect from '../lib/redirect'
import './Checkout.scss'

import visa from 'payment-icons/min/flat/visa.svg';
import mastercard from 'payment-icons/min/flat/mastercard.svg';
import amex from 'payment-icons/min/flat/amex.svg';
import diners from 'payment-icons/min/flat/diners.svg';
import gql from "graphql-tag";

const SET_PAYMENT = gql`
  mutation Create($number: String!, $exp_year: String!, $exp_month: String!, $cvc: String!, $phone: String!
    $event_name: String!, $price: String!, $quantity: String!, $document: String!, $name: String!, $last_name: String!) {
    createCreditCardPayment(
      creditCard: {
        number: $number,
        expYear: $exp_year,
        expMonth: $exp_month,
        cvc: $cvc
      },
      event: {
        name: $event_name,
        price: $price,
        quantity: $quantity
      },
      customerDetails: {
        document: $document,
        name: $name,
        lastName: $last_name,
        phone: $phone
      }
    ){
      transaction {
        transactionId,
        transactionType,
        eventName,
        ticketQuantity
      }
    }
  }
`
@inject("store")
@observer
class Event extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      price: 1000,
      tickets: 1,
      errorMsg: null
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
    let cardname, cardlastname, idnumber, phonenumber, cardnumber, expmonth, expyear, cvv
    const { tickets, errorMsg, price } = this.state
    const { event } = this.props.router.query
    return (
      <Mutation
      mutation={SET_PAYMENT}
      onCompleted={data => {
        console.log({data})
      }}
      onError={error => {
        console.log(error)
      }}
    >
    {(create, { data, error }) => (
        <div className="container">
        {error && <p>Issue occurred while ordering :(</p>}
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
                  <p>Total $COP {(price*tickets).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </p>
                </div>
               </div>
              </div>
            </div>
              <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                if(cardnumber.value && expyear.value && expmonth.value && cvv.value
                  && idnumber.value &&cardname.value && cardlastname.value && phonenumber.value) {
                    create({
                      variables: {
                        // 4575623182290326 CC
                        number: cardnumber.value,
                        exp_year: expyear.value,
                        exp_month: expmonth.value,
                        cvc: cvv.value,
                        event_name: `quillalabs-${event}`,
                        price: price.toString(),
                        quantity: tickets.toString(),
                        document: idnumber.value,
                        name: cardname.value,
                        last_name: cardlastname.value,
                        phone: phonenumber.value
                      }
                    })
                    cardname.value = cardlastname.value = idnumber.value = cardnumber.value = expmonth.value = expyear.value = cvv.value = phonenumber.value = ''
                }else {
                  this.setState({errorMsg: 'Fields are missing'})
                }
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

            <label htmlFor="ccnum">Número de Identificación</label>
            <input type="text" id="idnum" name="idnumber" placeholder="12341234"
              ref={node => {
                idnumber = node
              }}
            />

            <label htmlFor="ccnum">Número de Telefono</label>
            <input type="text" id="phonenum" name="phonenumber" placeholder="311232394"
              ref={node => {
                phonenumber = node
              }}
            />

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
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
            <button onClick={this.goCheckout}
              className="button" style={{textAlign: 'center', width: '35%'}}>Pagar</button>
            </div>
          </form>
          </div>

        </div>
        )}
      </Mutation>
    )
  }
}

export default withRouter(withApollo(Event))
