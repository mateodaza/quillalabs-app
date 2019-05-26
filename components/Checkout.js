import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import './Checkout.scss'

@inject("store")
@observer
class Event extends React.Component{

  render() {
    let cardname, cardnumber, expmonth, expyear, cvv
    const { event } = this.props

    return (
      <div>
        <div className="container">
         <div className="col col-50">
            <h3>Payment</h3>
            <label htmlFor="fname"> </label>
            <div className="icon-container">
              <i className="pf pf-stripe"></i>
              <i className="fa fa-cc-amex"></i>
              <i className="fa fa-cc-mastercard"></i>
              <i className="fa fa-cc-discover"></i>
            </div>
              <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()

                console.log({cardname: cardname.value})
                // PROCEED CHECKOUT
                cardname.value = cardnumber.value = expmonth.value = expyear.value = cvv.value = ''
              }}
            >
            <label htmlFor="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="John More Doe"
              ref={node => {
                cardname = node
              }}
            />
            <label htmlFor="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"
              ref={node => {
                cardnumber = node
              }}
            />
            <label htmlFor="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="September"
              ref={node => {
                expmonth = node
              }}
            />
            <div className="row">
              <div className="col-50">
                <label htmlFor="expyear">Exp Year</label>
                <input type="text" id="expyear" name="expyear" placeholder="2019"
                  ref={node => {
                    expyear = node
                  }}
                />
              </div>
              <div className="col-50">
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
              className="button" style={{textAlign: 'center', width: '35%'}}>Pay</button>
            </div>
          </form>

          </div>

        </div>
      </div>
    )
  }
}

export default withApollo(Event)
