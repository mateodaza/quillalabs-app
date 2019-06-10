import { observer, inject } from "mobx-react";
import { withApollo } from 'react-apollo'
import { Link } from '../../routes'
import Colors from '../../common/colors'
import moment from 'moment'

import "./EventCard.scss"

@inject("store")
@observer
class EventCard extends React.Component{

  render() {
    const { store, event, title, content, date, type, bgImage } = this.props
    let dateFormat = null
    console.log({event})
    let dates = []
    if(date){
      dateFormat = moment.unix(date).locale("es")
      dates[0] = dateFormat.format('D')
      dates[1] = dateFormat.format('MMMM')
      dates[2] = dateFormat.format('YYYY')
    }
    // console.log({store})
    return (
      <div>
        <div className="example-1 card">
          <div className="wrapper" style={{background: `no-repeat url(${bgImage})`,
            backgroundSize: 'contain', backgroundPosition: 'center'}}>
            <div className="date" style={{backgroundColor: date ? Colors.red : Colors.green}}>
              {
                date ? (
                  <span>
                    <span className="day">{dates[0]}</span>
                    <span className="month">{dates[1]}</span>
                    <span className="year">{dates[2]}</span>
                  </span>
                ): (
                  <span className="day">coming soon</span>
                )
              }
            </div>
            <Link route='event' params={{name: event}}>
              <div className="data" style={{cursor: 'pointer'}}>
                <div className="content">
                  <span className="author">{type}</span>
                  <h1 className="title">
                    <Link route='event' params={{name: event}}>
                    <p>{title}</p>
                    </Link>
                  </h1>
                  <p className="text">{content}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withApollo(EventCard)
