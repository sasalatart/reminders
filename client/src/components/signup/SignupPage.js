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
    return(
      <div className="signup-page">
        <h1 className="title is-1 has-text-centered">Signup</h1>
        <div className="column is-4 is-offset-4">
          <SignupForm onSignup={this.onSignup} />
        </div>
      </div>
    )
  }
}

export default SignupPage;
