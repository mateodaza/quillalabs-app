import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { observer } from 'mobx-react'
import { withTranslation, Link } from '../../../i18n'
import colors from '../../../common/colors'

const plugins = {
  dvr: dvr(validatorjs)
};

const hooks = {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  },
  onError(form) {
    alert('Form has errors!');
    // get all form errors
    console.log('All form errors', form.errors());
  }
}

const RegisterForm = observer(({t}) => {

  const fields = [{
    name: 'email',
    label: t('email'),
    placeholder: t('email').toLowerCase(),
    rules: 'required|email|string|between:5,25',
  }, {
    name: 'password',
    label: t('password'),
    placeholder: t('password').toLowerCase(),
    rules: 'required|string|between:5,25',
  }, {
    name: 'verify_password',
    label: t('verify_password'),
    placeholder: t('verify_password').toLowerCase(),
    rules: 'required|string|between:5,25',
  }];

  const myForm = new MobxReactForm({ fields }, { plugins, hooks });

  return (
  <div>
    <form onSubmit={myForm.onSubmit}>
      <label htmlFor={myForm.$('email').id}>
        <h6>{myForm.$('email').label}</h6>
      </label>
      <input {...myForm.$('email').bind()} />
      <p>{myForm.$('email').error}</p>

      <label htmlFor={myForm.$('password').id}>
        <h6>{myForm.$('password').label}</h6>
      </label>
      <input {...myForm.$('password').bind()} />
      <p>{myForm.$('password').error}</p>

      <label htmlFor={myForm.$('verify_password').id}>
        <h6>{myForm.$('verify_password').label}</h6>
      </label>
      <input {...myForm.$('verify_password').bind()} />
      <p>{myForm.$('verify_password').error}</p>

      {/* ... other inputs ... */}
      <div className="buttons">
        <button className="button" type="submit" onClick={myForm.onSubmit}>{t('submit')}</button>
        {
          // <button className="button" type="button" onClick={myForm.onClear}>Clear</button>
          // <button className="button" ype="button" onClick={myForm.onReset}>Reset</button>
        }
        <div className="column extra">
          <Link href='/login'>
            <a className="new-txt">{t('register-title')}</a>
          </Link>
        </div>
      </div>
      <p>{myForm.error}</p>
    </form>
    <style jsx>{`
      h6 {
        color: ${colors.black3}
      }
      p {
        color: ${colors.red}
      }
      form {
        top: 5%;
      }
      input {
        padding: 12px 20px;
        margin: 0 0 2% 0;
        border 0.5px solid darkgray;
        text-align: left;
        color: ${colors.black3};
        font-size: 1em
      }
      input:focus {
        border 0.5px solid ${colors.black3};
      }
      input::placeholder {
        text-align: left;
        color: darkgray
      }
      label {
        margin: 0;
        font-size: 0.8em
      }
      button {
        background-color: darkgray;
        border-color: darkgray;
        color: white;
      }
      button:hover {
        background-color: white;
        border-color: white;
        color: darkgray
      }
      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
      .forgot-txt {
        font-size: 1em;
        color: ${colors.blue};
        padding-top: 0.5em;
        background-color: transparent;
      }
      .new-txt {
        font-size: 1em;
        top: 2%;
        padding-left: 1em;
        color: ${colors.black3}
      }
      .extra {
        display: flex;
        align-text: center;
        padding-top: 0.5em;
        background-color: transparent;
      }

      @media (max-width: 40.0rem) { 
        input { 
          margin: 0;
          width: 80%;
        }
      }
    `}</style>
  </div>
)});

export default withTranslation(["auth", "common"])(RegisterForm)