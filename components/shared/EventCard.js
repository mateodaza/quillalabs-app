import { observer, inject } from "mobx-react";
import { withApollo } from 'react-apollo'
import Colors from '../../common/colors'
import moment from 'moment'
import "./EventCard.scss"

@inject("store")
@observer
class EventCard extends React.Component{

  render() {
    const { store, title, content, date, type, bgImage } = this.props
    let dateFormat = null
    let dates = []
    if(date){
      dateFormat = moment.unix(date).lang("es")
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
                    <span class="day">{dates[0]}</span>
                    <span class="month">{dates[1]}</span>
                    <span class="year">{dates[2]}</span>
                  </span>
                ): (
                  <span class="day">coming soon</span>
                )
              }
              
            </div>
            <div className="data">
              <div className="content">
                <span className="author">{type}</span>
                <h1 className="title"><a href="#">{title}</a></h1>
                <p className="text">{content}</p>
              </div>
              <input type="checkbox" id="show-menu" />
              <ul className="menu-content">
                <li>
                  <a href="#" className="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" className="fa fa-heart-o"><span>47</span></a></li>
                <li><a href="#" className="fa fa-comment-o"><span>8</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withApollo(EventCard)
