import React, {PropTypes} from 'react'

const TextInput = ({name, value, placeholder, isPassword=false, errors=false, onChange}) => {
  return(
    <div className={errors ? 'control has-icon has-icon-right' : 'control'}>
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
  value: PropTypes.string
}

export default TextInput;
