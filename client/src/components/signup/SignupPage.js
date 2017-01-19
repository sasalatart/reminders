import React from 'react';
import SignupForm from './SignupForm';

const SignupPage = ({ onSignup }) => {
  return(
    <div className="signup-page is-flex-1 is-aligner is-flex-column">
      <h1 className="title is-1 has-text-centered">Signup</h1>
      <h2 className="subtitle has-text-centered">Keep track of your reminders.</h2>
      <div className="column is-4">
        <SignupForm onSignup={jwt => onSignup(jwt)} />
      </div>
    </div>
  )
}

export default SignupPage;
