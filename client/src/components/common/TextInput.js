import React, {PropTypes} from 'react'

const TextInput = ({name, value, placeholder, isPassword=false, icon=false, errors=false, onChange}) => {
  let wrapClassName = 'control';
  wrapClassName += icon ? ' has-icon' : '';
  wrapClassName += errors ? ' has-icon has-icon-right' : '';

  return(
    <div className={wrapClassName}>
      {
        icon && !errors &&
        <span className="icon is-small">
          <i className={"fa fa-" + icon}></i>
        </span>
      }

      <input
        className={errors ? 'input is-danger' : 'input'}
        type={isPassword ? 'password' : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange} />

      {
        errors &&
        <span className="icon is-small">
          <i className="fa fa-warning"></i>
        </span>
      }

      { errors && <span className="help is-danger">{errors}</span> }
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default TextInput;
