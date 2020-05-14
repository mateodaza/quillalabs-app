import HomePage from '../components/Home'
import { withAuthComponent, withAuthServerSideProps } from '../lib/withAuth';

function Home({user}) {
  return (
    <HomePage />
  )
}

export default withAuthComponent(Home)
export const getServerSideProps = withAuthServerSideProps();