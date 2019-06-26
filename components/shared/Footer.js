import { observer, inject } from "mobx-react";
import { withApollo } from 'react-apollo'
import Colors from '../../common/colors'

let ig = "http://www.transparentpng.com/thumb/logo-instagram/eerDTf-logo-instagram-clipart-transparent.png"
let lin = "https://cdn3.iconfinder.com/data/icons/social-media-logos-flat-colorful/2048/5296_-_LinkedIn-512.png"
let tw = "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1259px-Twitter_Bird.svg.png"

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
          <div className="social-icons">
            <a><img className="icon" src={tw}></img></a>
            <a><img className="icon" src={lin}></img></a>
            <a><img className="icon" src={ig}></img></a>
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
          align-items: center;
          justify-content: space-between;
          bottom: 0;
          background-color: ${Colors.white};
        }

        .icon {
          width: 42px;
          position: relative;
          background-color: transparent;
        }

        .copyright {
          width: 75%;
        }
        .copyright * {
          background: rgb(242,199,180); /* Old browsers */
          background: -moz-linear-gradient(left, rgba(242,199,180,1) 0%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 2%, rgba(240,202,170,1) 6%, rgba(222,222,172,1) 38%, rgba(222,222,172,1) 41%, rgba(222,222,172,1) 44%, rgba(170,220,179,1) 68%, ${Colors.white} 99%); /* FF3.6-15 */
          background: -webkit-linear-gradient(left, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${Colors.white} 99%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to right, rgba(242,199,180,1) 0%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 2%,rgba(240,202,170,1) 6%,rgba(222,222,172,1) 38%,rgba(222,222,172,1) 41%,rgba(222,222,172,1) 44%,rgba(170,220,179,1) 68%,${Colors.white} 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2c7b4', endColorstr='#f1eded',GradientType=1 );
        }
        .copyright p {
          color: ${Colors.black3};
          font-size: 14px;
          font-weight: lighter;
        }

        .social-icons {
          display: flex;
          flex: 1;
          width: 20vw:
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }

        a {
          cursor: pointer;
        }

        p {
          padding-left: 10%;
          color: ${Colors.black};
          font-size: 0.7em;
          line-height: 70px;
          text-transform: capitalize;
          letter-spacing: 1px;
        }
        
        @media only screen and (max-width: 600px) {
          footer {
            flex-direction: column;
          }
          .copyright {
            width: 100%;
            margin: 15% 0 0 0;
          }
          .copyright * {
            background: rgb(255,255,255); /* Old browsers */
            background: -moz-linear-gradient(-45deg, rgba(255,255,255,1) 2%, rgba(225,225,171,1) 31%, rgba(225,225,171,1) 64%, rgba(251,198,175,1) 101%); /* FF3.6-15 */
            background: -webkit-linear-gradient(-45deg, rgba(255,255,255,1) 2%,rgba(225,225,171,1) 31%,rgba(225,225,171,1) 64%,rgba(251,198,175,1) 101%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(135deg, rgba(255,255,255,1) 2%,rgba(225,225,171,1) 31%,rgba(225,225,171,1) 64%,rgba(251,198,175,1) 101%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#fbc6af',GradientType=1 );
          }
          .social-icons {
            width: 100vw;
            margin: 5% 0;
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
