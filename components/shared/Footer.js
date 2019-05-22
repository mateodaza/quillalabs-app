import { observer, inject } from "mobx-react";
import { withApollo } from 'react-apollo'
import Colors from '../../common/colors'

@inject("store")
@observer
class Footer extends React.Component{

  render() {
    const { store } = this.props
    // console.log({store})
    return (
      <div>
        <footer>
          <div className="copyright">
            <p>&copy; QuillaLabs - 2019</p>
          </div>
          <div className="social">
            <a href="#" className="support">Contact Us</a>
            <a href="#" className="face">f</a>
            <a href="#" className="tweet">t</a>
            <a href="#" className="linked">in</a>
          </div>
        </footer>
        <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          bottom: 0;
        }

        .copyright {
          width: 55%;
        }
        .copyright * {
          background-color: ${Colors.lightYellow};
        }
        .copyright p {
          color: ${Colors.black};
          font-size: 14px;
          font-weight: bold;
        }

        .social {
          background-color: ${Colors.red};
          width: 45%;
        }

        p {
          padding-left: 10%;
          color: ${Colors.black};
          font-size: 0.7em;
          line-height: 70px;
          text-transform: capitalize;
          letter-spacing: 1px;
        }
        a {
          float: left;
          line-height: 70px;
          text-decoration: none;
          color: white;
          text-align: center;
          font-weight: bold; 
          transition: all 0.3s;      
        }

        a:hover {
          transition: all 0.3s;   
        }
        
        .linked {
          background-color: ${Colors.red};
          font-size: 20px;
          width: 15%;
        }
        .linked:hover {
          background-color: #0077B5;
        }
        
        .face {
          background-color: ${Colors.red};
          font-size: 20px;
          width: 15%;
        }
        .face:hover {
          background-color: #3b5998;
        }
        
        .tweet {
          background-color: ${Colors.red};
          font-size: 20px;
          width: 15%;
        }
        .tweet:hover {
          background-color: #0084b4;
        }
        
        .support {
          background-color: ${Colors.green};
          font-size: 0.8em;
          width: 55%;
        }  
        .support:hover {
          background-color: ${Colors.black};
        } 

        @media only screen and (max-width: 600px) {
          footer {
            flex-direction: column;
          }
          .copyright {
            width: 100%;
          }
          .social {
            width: 100%;
          }
          p{
            text-align: center;
            padding: 0;
          }
        }
      `}</style>
      </div>
    )
  }
}

export default withApollo(Footer)
