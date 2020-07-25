import { Fragment } from 'react'
import Layout from '../shared/Layout'
import WithWeb3 from '../../lib/withWeb3'

function Web3Test({web3, accounts}) {
  console.log({web3, accounts})
  return (
    <Layout>
      <h3>Web3 Is ready folks</h3>
    </Layout>
  )
}

export default WithWeb3(Web3Test)