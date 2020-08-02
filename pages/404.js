import Link from 'next/link'

function Custom404() {
  
  return <div className="container centered">
    <div className="column">
      <h1>404 - Page Not Found.</h1>
      <Link href="/"><a>Go to our home instead</a></Link>
    </div>
    <style jsx>{`
    .centered {
      display: flex;
      flex: 1;
      margin: 20% 0;
      justify-content: center
    }
    a {
      font-size: 1.4em
    }
  `}</style>
  </div>
}

export default Custom404
