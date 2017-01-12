import React, { PropTypes } from 'react';

const SubmitInput = ({ disabled=false, loading, onSubmit }) => {
  return(
    <div className="control">
      <button
        className={loading ? 'button is-primary is-loading' : 'button is-primary'}
        type="button"
        onClick={onSubmit}
        disabled={disabled}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

SubmitInput.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default SubmitInput;
