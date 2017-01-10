import React, {PropTypes} from 'react'

const TextInput = ({name, value, placeholder, onChange, isPassword=false}) => {
  return(
    <div className="control">
      <input
        className="input"
        type={isPassword ? 'password' : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange} />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default TextInput;
