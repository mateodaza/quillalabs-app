import Layout from './shared/Layout'

class Landing extends React.Component {
  render() {
    return <Layout>
      <div className="main">
        <h1>QuillaLabs</h1>
        <h4>Embajada Blockchain</h4>
      </div>
      <div className="cards-container">
        <div className="card"> 
          <h4>StartupGrind</h4>
        </div>
        <div className="card"> 
          <div>
          <h4>BoT Latam</h4>
          </div>
        </div>
        <div className="card"> 
          <h4>Maker DAO meetups (comming soon)</h4>
        </div>
      </div>
      <style jsx>{`
      .main {
        height: 40vh;
      }
      .cards-container {
        display: grid;
        height: 100%;
        min-height: 80vh;
        justify-items: center;
        grid-template-columns: repeat(auto-fit, minmax(256px, 1fr)); /* Where the magic happens */
        grid-auto-rows: 94px;
      }
      .cards-container * {
        background-color: lightgrey;
      }
      .card{
        width: 80%;
        min-height: 200px;
        height: 100%;
        margin: 5% 0;
        padding: 5% 0;
      }

      @media ( max-width: 1000px ) {
        .cards-container {
          grid-template-rows: repeat(auto-fit, minmax(256px, 1fr)); /* Where the magic happens */
          grid-gap: 15%;
          margin-bottom: 115%;
        }
      }
    `}</style>
    </Layout>;
  }
}

export default Landing