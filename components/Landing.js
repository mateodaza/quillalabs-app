import Layout from './shared/Layout'
import EventCard from './shared/EventCard'

class Landing extends React.Component {
  render() {
    return <Layout>
      <div className="main">
        <h1 style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 'light'}}>Embajada Blockchain en Barranquilla Colombia</h1>
      </div>
      <div className="cards-container">
        <EventCard title="Startup Grind" event="startup" content="Fireside Chat con Edward Sosa y Jose Bell. Expertos en el tema de blockchain y Criptomonedas. "
           date="1535660673" type="Meetup" bgImage={require("../assets/startupgrind.png")}/>
        <EventCard title="BoT Latam" event="botlatam" content="Ven a conocer casos de uso en la Blockchain con proyectos directos del crypto valley en suiza!"
            date="1543609443" type="Conferencia" bgImage={require("../assets/bot.png")}/>
        <EventCard title="MakerDAO Meetup" event="maker" content="Aprende acerca de MakerDAO y DAI, compartiendo una cerveza e intercambiando cripto!"
            type="Meetup" bgImage={require("../assets/maker.jpg")}/>
        </div>
      <style jsx>{`
      .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40vh;
        margin: 1% 0 5% 0;
      }
      .main * {
        text-align: center;
      }
      .cards-container {
        display: grid;
        height: 100%;
        margin-bottom: 10%;
        min-height: 80vh;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        grid-gap: 1rem;
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
        .main {
          margin-bottom: 15%;
        }
        .cards-container {
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 5%;
          grid-auto-rows: auto;
          margin-bottom: 115%;
        }
      }
    `}</style>
    </Layout>;
  }
}

export default Landing