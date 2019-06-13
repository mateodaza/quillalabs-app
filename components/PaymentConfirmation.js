import { observer, inject } from "mobx-react";
import Head from 'next/head'
import { Mutation, withApollo } from 'react-apollo'
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

@inject("store")
@observer
class PaymentConfirmation extends React.Component{

  constructor() {
    super()
    this.state = {
      startFetch: true,
      loading: true
    }
  }

  sendResponse =()=> {
    this.setState({startFetch: false})
  }

  render() {
    const { startFetch, loading } = this.state
    console.log(this.props.router)
    // const { qty, price, ref_payco } = this.props.router.query
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
    {(create, { data, error }) => (
      <div>
      {loading && (<h3>Loading...</h3>)}
      {startFetch && (()=>{
        create({
          variables: {
            event_name: 'MKR-Meetup1_QuillaLabs',
            price: price.toString(),
            quantity: qty.toString(),
            type: "online_payment", //
            ref: ref_payco.toString()
          }
        })
      })}

      <style jsx>{`
      
      `}</style>
      </div>
    )}
    </Mutation>
    )
  }
}

export default withApollo(PaymentConfirmation)
