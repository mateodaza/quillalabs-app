import { observer, inject } from "mobx-react";
import { Mutation, withApollo } from 'react-apollo'

@inject("store")
@observer
class Event extends React.Component{

  render() {
    const { event } = this.props
    let image = ''
    console.log({event})

    switch(event) {
      case 'startup':
        image = require("../assets/startupgrind.png")
        break;
      case 'botlatam':
        image = require("../assets/bot.png")
        break;
      case 'maker':
        image = require("../assets/maker.jpg")
        break;
      default:
        image = require("../assets/startupgrind.png")
        break;
    }

    return (
      <div>
        <div className="container">
          <img src={image}/>

        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center
          }
          img {
            align-self: center;
            max-width: 60%;
            height: auto;
            box-shadow: 0 7px 11px 0 rgba(0,0,0,0.1),0 17px 50px 0 rgba(0,0,0,0.19);
          }
          @media ( max-width: 900px ) {
            img {
              max-width: 80%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withApollo(Event)
