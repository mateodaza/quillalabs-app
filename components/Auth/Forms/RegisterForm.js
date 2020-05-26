
import { useForm } from 'react-hook-form';
import { withTranslation, Link } from '../../../i18n'
import { callAPI } from '../../../helpers/services'
import { useToasts } from 'react-toast-notifications'
import Router from 'next/router'
import colors from '../../../common/colors'

import Field from '../../shared/Field'

const RegisterForm =({t})=> {

  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts()

  const onSubmit = async(formData) => {
    const res = await callAPI("/users", {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: formData.registerEmail,
          password: formData.registerPassword
        }
      })
    }, null, addToast);
    const { data } = res
    if(data) {
      addToast('Go check your e-mail', { appearance: 'success', })
      Router.push("/login")
    }
  };

  const fields = [{
    name: 'registerEmail',
    type: 'email',
    label: t('email'),
    placeholder: t('email').toLowerCase(),
    rules: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: t('error-email'),
    required: true
  }, {
    name: 'registerPassword',
    type: 'password',
    label: t('password'),
    placeholder: t('password').toLowerCase(),
    rules: /^.{8,}$/,
    // rules: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/,
    error: t('error-password'),
    required: true
  },
  {
    name: 'registerVerifyPassword',
    type: 'password',
    label: t('verify-password'),
    placeholder: t('password').toLowerCase(),
    rules: /^.{8,}$/,
    // rules: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/,
    error: t('error-password'),
    required: true
  }];

  return (
  <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        fields.map((field, key)=> {
          return <Field key={key} field={field} register={register} errors={errors} />
        })
      }
      <div className="buttons">
        <button className="button" type="submit">{t('submit')}</button>
        <div className="column extra">
          <Link href="/login">
            <a className="new-txt">{t('register-title')}</a>
          </Link>
        </div>
      </div>
    </form>
    <style jsx>{`
      form {
        top: 5%;
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
    `}</style>
  </div>
)};

export default withTranslation(["auth", "common"])(RegisterForm)