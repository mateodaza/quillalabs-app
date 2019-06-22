import { observer, inject } from "mobx-react";
import Head from 'next/head'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import Router, { withRouter } from 'next/router'
// import { Router } from '../routes'
import colors from '../common/colors';



const GET_TICKETS = gql`
  {
    getCurrentUserTickets {
      price
      status
      eventName
      ticketQuantity
    }
    getCurrentUser {
      user {
        firstName
        lastName
      }
      tickets {
        price
        status
        eventName
        ticketQuantity
      }
    }
  }
`

@inject("store")
@observer
class Tickets extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {

  }

  render() {
    const { ssrDone, origin } = this.state
    const { store, event, router } = this.props

    return (
      <div>
        <Query query={GET_TICKETS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            if (data) console.log({data})
            return (
              <p>HAI HAI</p>
            );
          }}
        </Query>
        <style jsx>{`
          

          @media ( max-width: 900px ) {
            
          }
        `}</style>
      </div>
    )
  }
}

export default withApollo(withRouter(Tickets))
