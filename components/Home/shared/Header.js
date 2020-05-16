import { inject, observer } from 'mobx-react'

function Header(props) {
  const { authStore } = props.store

  return (
    <div className="header">
      <h3>QuishaCamps</h3>
      <h5><a>Login</a></h5>
      
      <style jsx>{`
        .header {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default inject("store")(observer(Header))