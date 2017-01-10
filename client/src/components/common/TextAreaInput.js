import React, {PropTypes} from 'react'

const TextAreaInput = ({name, value, placeholder, onChange}) => {
  return(
    <div className="control">
      <textarea
        className="textarea"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange} ></textarea>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default TextAreaInput;
