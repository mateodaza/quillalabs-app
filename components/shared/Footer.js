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
        }

        .icon {
          width: 32px;
          height: 32px;
          top: 10px;
          position: relative;
          background-color: transparent;
        }

        .copyright {
          width: 75%;
        }
        .copyright * {
          background: #ADA996;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to left, #0000,  #F2F2F2, ${Colors.pastel}, #ADA996);
          background: linear-gradient(to left, #0000, #F2F2F2, ${Colors.pastel}, #ADA996 );
        }
        .copyright p {
          color: ${Colors.white};
          font-size: 14px;
          font-weight: bold;
        }

        .social {
          background-color: ${Colors.red};
          width: 30%;
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
          }
          .copyright * {
            background: #ADA996;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to bottom, #0000 1%, #ADA996 100%);
            background: linear-gradient(to bottom, #0000 15%, ${Colors.pastel} 5%, #ADA996 80%);
          }
          .copyright p {
            color: ${Colors.white};
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
