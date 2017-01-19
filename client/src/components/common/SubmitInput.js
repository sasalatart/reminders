import React, { PropTypes } from 'react';

class SubmitInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return(
      <div className="control">
        <button
          className={this.props.loading ? 'button is-primary is-loading' : 'button is-primary'}
          type="submit"
          onClick={this.onSubmit}
          disabled={this.props.disabled || false}>
          {this.props.loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    );
  }
}

SubmitInput.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SubmitInput;
