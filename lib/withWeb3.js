import React, { Fragment, Component } from 'react'
import getWeb3 from './getWeb3'

export default function withWeb3(Web3Component) {

  class Container extends Component {
    state = { web3: null, accounts: null };

    async componentDidMount () {
      try {
        const web3 = await getWeb3()
        const accounts = await web3.eth.getAccounts()
        this.setState({ web3, accounts })
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        )
        console.log(error)
      }
    }

    render() {

      const { web3, accounts } = this.state

      return web3 && accounts ? (
        <Fragment>
          <Web3Component {...this.state} {...this.props}/>        
        </Fragment>
      ): (
        <h3>Loading web3</h3>
      )
    }
  }

  return Container

}