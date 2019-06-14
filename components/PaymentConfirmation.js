import { observer, inject } from "mobx-react";
import Head from 'next/head'
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import { Link } from '../routes'
import redirect from '../lib/redirect'
import Router from 'next/router'
// import { Router } from '../routes'
import colors from '../common/colors'
import gql from "graphql-tag"

const SET_TRANSACTION = gql`
  mutation Create( $event_name: String!, $price: String!, $quantity: String!, $type: String!, $ref: String! ) {
    createEventTransaction(
      event: {
        name: $event_name,
        price: $price,
        quantity: $quantity,
        transactionRef: $ref,
        transactionType: $type
      }
    ){
      transaction {
        transactionId,
        transactionType,
        eventName,
        ticketQuantity,
        status
      }
    }
  }
`

class CallConfirmation extends React.Component {
  componentDidMount() {
    // this.props.sendResponse()
  }

  render() {
    // React 16
    return this.props.children || null
    // Old School :)
    // return <div>{ this.props.children }</div>
  }
}

@inject("store")
@observer
class PaymentConfirmation extends React.Component{

  sendResponse =()=> {
    this.setState({startFetch: false})
  }

  render() {
    const { qty, price, ref_payco } = this.props.router.query
    return (
      <Mutation
      mutation={SET_TRANSACTION}
      onCompleted={data => {
        console.log({data})
      }}
      onError={error=> {
        console.log(error)
      }}
    >
    {(create, { data, loading, error }) => (
      <div className="container">
      {loading && (<h3>Loading...</h3>)}
      <CallConfirmation sendResponse={()=>create({
          variables: {
            event_name: 'MKR-Meetup1_QuillaLabs',
            price: price.toString(),
            quantity: qty.toString(),
            type: "online_payment", //
            ref: ref_payco.toString()
          }
        })}>
      </CallConfirmation>
      {!loading && (
        <div className="info-container">
          <div style={{textAlign: 'center', flex: 0.8}}>
            <h2>Estamos listos! Revisa el estado de tu ticket <Link route='tickets'><strong>aqui</strong></Link></h2>
          </div>
          <div className="img-container">
            <img src="https://i.imgur.com/yljLCiB.png"/>
            <span style={{textAlign: 'center'}}><p className="img-footer">Elon Musk's Starman</p></span>
          </div>
        </div>
      )}
      <style jsx>{`
        * {
          color: ${colors.black}
        }
        h2 {
          color: ${colors.black2}
        }
        strong {
          color: ${colors.black3};
          cursor: pointer;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // padding: 5% 0;
        }
        img {
          border-radius: 50%;
          align-self: center;
          max-width: 100%;
          height: auto;
          box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
        }
        .img-footer {
          margin-left: 80%;
          font-size: 12px
        }
        .img-container {
          width: 35%;
          padding: 5% 2%;
          background-color: inherit;
          margin-top: 5%;
          text-align: end
          // border: 1px solid black;
          box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
        }
        .info-container {
          display: flex;
          text-align: center; 
          justify-content: space-between;
          flex-direction: row;
          align-items: center
        }

        @media ( max-width: 900px ) {
          .info-container { 
            flex-direction: column;
          }
          .img-footer {
            margin-left: 50%;
          }
          img {
            min-width: 100%;
          }
        }
      `}</style>
      </div>
    )}
    </Mutation>
    )
  }
}

export default withApollo(withRouter(PaymentConfirmation))
