import React, { PropTypes } from 'react';

const SubmitInput = ({ loading, onSubmit }) => {
  return(
    <p className="control">
      <button
        className={loading ? 'button is-primary is-loading' : 'button is-primary'}
        type="button"
        onClick={onSubmit}
        disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </p>
  );
};

SubmitInput.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default SubmitInput;
