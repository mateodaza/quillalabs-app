import colors from '../../common/colors'

function Field({field, register, errors, key}) {

  return (
    <div>
      <div key={key} className="field">
        <label><h6>{field.label}</h6></label>
        <input name={field.name} placeholder={field.placeholder} type={field.type}
          ref={register({ required: field.required, pattern: field.rules })} />
        <p>{errors[field.name] && field.error}</p>
      </div>
    <style jsx>{`
      h6 {
        color: ${colors.black3}
      }
      p {
        color: ${colors.red}
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
      .field {
        display: flex;
        flex-direction: column;
      }
      @media (max-width: 40.0rem) { 
        .field {
          width: 80vw;
        }
        input { 
          margin: 0;
          width: 100%;
        }
      }
    `}</style>
  </div>
  )
}

export default Field