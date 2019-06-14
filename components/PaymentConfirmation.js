import { observer, inject } from "mobx-react";
import Head from 'next/head'
import { Mutation, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'
import redirect from '../lib/redirect'
import Router from 'next/router'
// import { Router } from '../routes'
import gql from "graphql-tag";

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
      <div>
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
      <style jsx>{`
      
      `}</style>
      </div>
    )}
    </Mutation>
    )
  }
}

export default withApollo(withRouter(PaymentConfirmation))
