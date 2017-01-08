import React, {PropTypes} from 'react'

const TextInput = ({name, value, placeholder, onChange, isPassword=false}) => {
  return(
    <p className="control">
      <input
        className="input"
        type={isPassword ? 'password' : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange} />
    </p>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default TextInput;
