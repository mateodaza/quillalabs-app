import { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { useToasts } from 'react-toast-notifications'
import { callAPI } from '../../helpers/services'
import { withTranslation } from '../../i18n'
import { useRouter } from 'next/router'
import { random } from '../../lib/images'

function UnderConstruction(props) {
  const [ isVerified, setIsVerified ] = useState(false)
  const [ error, setError ] = useState(false)
  const { t, store } = props
  const { authStore} = store

  const router = useRouter()
  const { addToast } = useToasts()

  const { confirmation_token } = router.query
  console.log({confirmation_token})

  const checkEmail =async()=> {
    // Call Verification
    const res = await callAPI("/confirmations", null, {
      method: 'PUT',
      body: JSON.stringify({ confirmation_token })
    }, null, addToast);
    const { data } = res
    if(data) {
      addToast(data.message, { appearance: 'success' })
      setIsVerified(true)
    }else {
      setError(true)
    }
  }

  useEffect( () => {
    checkEmail()
    return () => {} }, []);

  return (
    <div className="container">  
      <section className="row under-container1">
        <img src={random.rocket_under_construction} className="under-construction-img"
          alt="Photo by Austrian National Library on Unsplash"/>
        <div className="under-container1-txt">
        {
          error ? <h2>Error, you haven't signed up with us</h2> :
          isVerified ? <h2><a href="/login">Go login you are verified</a></h2> : <h2>Verifying...</h2>
        }
        </div>
      </section>
      <style jsx>{`
        .under-construction-img {
          width: 45vw;
          height: 100%;
          margin: 5% 0;
        }
        .under-container1 {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }
        .under-container1-txt {
          margin: 0 0 0 1em;
          display: flex;
          flex-direction: column;
        }
        .under-container1-txt h5{
          margin-top: -1vw
        }

        @media (max-width: 40.0rem) { 
          .under-construction-img {
            width: 85vw;
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default withTranslation(['home', 'common'])(inject("store")(observer(UnderConstruction)))
