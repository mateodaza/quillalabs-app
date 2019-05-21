import { withApollo } from 'react-apollo'

const Header = ({ client, withHeader }) => {

  return (
    <header>
      <div className="header-container">
        <div>
          <p>QuillaLabs</p>
        </div>
        <div>
          <p>About Us</p>
          <p>Log In</p>
        </div>
      </div>      
      <style jsx>{`
      .header-container{
        display: flex;
        justify-content: space-between
      }
    `}</style>
    </header>
  )
}

export default withApollo(Header)
