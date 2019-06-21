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
            <a href="https://www.instagram.com/quillalabs/" className="insta">
              <img className="icon" src="https://en.instagram-brand.com/wp-content/themes/ig-branding/prj-ig-branding/assets/images/ig-logo.svg" />
            </a>
            <a href="https://twitter.com/QuillaLabs" className="tweet">
              <img className="icon" src="http://www.macdrifter.com/theme/images/twitter-snow.svg" />
            </a>
            <a href="https://www.linkedin.com/company/quillalabs" className="linked">
              <img className="icon" src="http://vcmediapartners.com/media/images/linkedin-white-icon.svg" />
            </a>
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
          background-color: ${Colors.white};
        }

        .icon {
          width: 32px;
          padding: 5%;
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

        .social {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: whi${Colors.white}te;
          // width: 100%;
        }
        .social a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 60%;
          margin-left: 15px;
          border-radius: 50%;
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
          color: ${Colors.white};
          text-align: center;
          font-weight: bold; 
          transition: all 0.3s;  
          
        }

        a:hover {
          transition: all 0.3s;   
        }
        
        .linked {
          background-color: #0077B5;
          font-size: 20px;
          width: 33.3%;
        }
        .linked:hover {
          background-color: ${Colors.black};
        }
        
        .insta {
          background: #f09433; 
          background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
          background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
          font-size: 20px;
          width: 33.3%;
        }
        .insta:hover {
          background: ${Colors.black};
        }
        
        .tweet {
          background-color: #0084b4;
          font-size: 20px;
          width: 33.3%;
        }
        .tweet:hover {
          background-color: ${Colors.black};
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
          .social {
            width: 100%;
          }
          .social a{
            width: 100%;
            border-radius: 0;
            margin-left: 0;
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
