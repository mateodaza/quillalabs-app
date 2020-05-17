import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../i18n'
import { random, logos} from '../../lib/images'
import colors from '../../common/colors'

import SignInForm from './Forms/SignInForm'

function SignIn(props) {
  const { store, t } = props
  const { authStore} = store

  return (
    <div className="container login">  
      <section className="row login-container">
        <div className="row login-title">
          <img src={logos.basic} width='100em' height='100%'/>
          <h3>{t("common:login")}</h3>
        </div>
        <div className="signIn-form">
          <SignInForm /> 
        </div>
      </section>
      <style jsx>{`
        h3 {
          color: ${colors.black3};
        }
        .login {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 65vh;
          padding: 10% 5%;
        }
        .login-container {
          flex-direction: column;
          justify-content: center;
        }
        .login-title {
          align-items: center
        }
        .login-title h3{
          margin: 0 0 0 2%;
        }

        .signIn-form {
          width: 25em;
          margin: 4% 0 0 0;
        }

        @media (max-width: 40.0rem) { 
          .login-title h3{
            margin: 5% 0 0 0;
          }
        }
      `}</style>
    </div>
  )
}

export default withTranslation(['login', 'common'])(inject("store")(observer(SignIn)))
