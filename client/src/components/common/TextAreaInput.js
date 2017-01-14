import React, {PropTypes} from 'react'

const TextAreaInput = ({name, value, placeholder, errors=false, onChange}) => {
  return(
    <div className={errors ? 'control has-icon has-icon-right' : 'control'}>
      <textarea
        className={errors ? 'textarea is-danger' : 'textarea'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange} ></textarea>

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

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaInput;
