import React from 'react';
import SignupForm from './SignupForm';

class SignupPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(jwt) {
    this.props.onSignup(jwt);
  }

  render() {
    return (
      <div className="signup-page">
        <h1 className="title is-1">Signup</h1>
        <SignupForm onSignup={this.onSignup} />
      </div>
    )
  }
}

export default SignupPage;
