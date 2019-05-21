import { withApollo } from 'react-apollo'
import Header from './Header'

const SigninBox = ({ client, withHeader, children }) => {


  return (
    <div>
      <Header />
      {children}
      <style jsx>{`
      .hello {
        font: 15px Helvetica, Arial, sans-serif;
        background: #eee;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
      }
      .hello:hover {
        background: #ccc;
      }
    `}</style>
    </div>
  )
}

export default withApollo(SigninBox)
