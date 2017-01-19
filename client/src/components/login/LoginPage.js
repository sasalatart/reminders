import React from 'react';
import LoginForm from './LoginForm.js';

const LoginPage = ({ onLogin }) => {
  return(
    <div className="login-page is-flex-1 is-aligner is-flex-column">
      <h1 className="title is-1 has-text-centered">Login</h1>
      <div className="column is-4">
        <LoginForm onLogin={jwt => onLogin(jwt)} />
      </div>
    </div>
  )
}

export default LoginPage;
