import { observer, inject } from "mobx-react";
import Head from 'next/head'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Mutation, withApollo } from 'react-apollo'
import redirect from '../lib/redirect'
import Router, { withRouter } from 'next/router'
// import { Router } from '../routes'
import colors from '../common/colors';

const image = require("../assets/flyer_test.jpeg")
const dexW = "https://www.dexwallet.io/img/bigXicon.png"
const play = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Get_it_on_Google_play.svg/1280px-Get_it_on_Google_play.svg.png"
const appStore = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png"

const GET_TICKETS = gql`
  {
    getCurrentUserTickets {
      price
      status
      eventName
      ticketQuantity
      ticketCode
      createdAt
    }
  }
`
// getCurrentUser {
//   user {
//     firstName
//     lastName
//   }
//   tickets {
//     price
//     status
//     eventName
//     ticketQuantity
//   }
// }

@inject("store")
@observer
class Tickets extends React.Component{

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  setStatus =(status)=> {
    const statusList = {"pending": "Pendiente", "accepted": "Aprobado"}
    if(!status) return "Fallido"
    return statusList[status]
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
            console.log({data})
            if (data && data.getCurrentUserTickets && data.getCurrentUserTickets.length > 0) { return data.getCurrentUserTickets.map((tkt, index) => {
                  return <div key={index}><div className="ticket-container">
                    <img className="eventImg" src={image}/>
                    <div className="ticket-info">
                      <h2>MakerDAO Talks I: DAI Happy Hour</h2><br/>
                      <h2>Ticket # {tkt.ticketCode.toUpperCase()}</h2>
                      <h3>Estado del pago: <b style={{color: tkt.status !== "accepted" ? colors.red : colors.green}}>
                        {this.setStatus(tkt.status)}</b>
                      </h3><br/>
                      <h3>Fecha: <b>18 de Julio, 2019 06:00 p.m.</b></h3>
                      <div className="divider"/>
                      <div className="ticket-extra">
                        <p>En este primer evento de la serie MakerDAO aprenderás sobre esta tecnología y su moneda estable DAI.<br/><br/>
                          Podrás comprar tu primera cerveza con una cantidad de DAI que te asignaremos durante la conferencia. <br/><br/>
                          Presenta tu número de ticket en la entrada del evento y descarga con anticipación tu DexWallet 
                          para recibir tus primer DAI y asi comprar tu cerveza! <br/>
                        </p><br/>
                        <div className="appsContainer">
                          <div className="imgContainer">
                            <a href="https://www.dexwallet.io/"><img className="tinyIcon" src={dexW}/><h3>DexWallet</h3></a>
                          </div>
                          <div className="imgContainer">
                            <a href="https://play.google.com/store/apps/details?id=io.dexlab.dexwallet&hl=en_US"><img className="mediumIcon" src={play}/></a>
                          </div>
                          <div className="imgContainer">
                            <a href="https://apps.apple.com/us/app/dexwallet/id1434816150?ls=1"><img className="mediumIcon" src={appStore}/></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    index + 1 !== data.getCurrentUserTickets.length && (
                      <div className="divider"/>
                    )
                  }
                  </div>
                });
            } else {
              return <h3>No Tickets</h3>
            }
          }}
        </Query>
        <style jsx>{`
          .eventImg {
            width: 35%;
            object-fit: contain;
            object-position: 0 0;
          }
          .tinyIcon {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
          .mediumIcon {
            width: 150%;
            height: auto;
            object-fit: cover;
            position: absolute;
            top: 25%;
          }
          .imgContainer {
            width: 15%;
            height: auto;
            position:relative;
          }
          .appsContainer {
            width: 80%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
          }
          h2 {
            color: ${colors.black2}
          }
          h3 {
            color: ${colors.black3}
          }
          .ticket-container {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            margin: 5% 0;
          }
          .ticket-info {
            text-align: end
          }
          .divider {
            margin: 2% 0;
            width: 100%;
            height: 2px;
            background: rgb(242,199,180); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(242,199,180,1) 0%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 6%, rgba(222,222,172,1) 38%, rgba(222,222,172,1) 41%, rgba(222,222,172,1) 44%, rgba(170,220,179,1) 68%, ${colors.white} 99%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${colors.white} 99%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to left, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${colors.white} 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2c7b4', endColorstr='#f1eded',GradientType=1 );
          }
          .ticket-extra {
            text-align: end;
            width: 90%;
            margin: 0 10%;
          }
          @media ( max-width: 800px ) {
            .eventImg {
              margin: 5% 0 0 0;
              width: 100%
            }
            .ticket-container {
              flex-direction: column-reverse;
            }
            .ticket-info {
              text-align: start
            }
            .ticket-extra {
              text-align: start;
              width: 100%;
              margin: 5% 0 10% 0;
              padding: 0;
            }
            .mediumIcon {
              width: 250%;
              top: 50%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withApollo(withRouter(Tickets))
