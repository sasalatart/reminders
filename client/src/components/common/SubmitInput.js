import React, { PropTypes } from 'react';

const SubmitInput = ({ loading, onSubmit }) => {
  return(
    <div className="control">
      <button
        className={loading ? 'button is-primary is-loading' : 'button is-primary'}
        type="button"
        onClick={onSubmit}
        disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

SubmitInput.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default SubmitInput;
