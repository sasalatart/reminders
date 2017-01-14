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
  disabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SubmitInput;
