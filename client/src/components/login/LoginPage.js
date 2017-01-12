import React from 'react';
import LoginForm from './LoginForm.js';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(jwt) {
    this.props.onLogin(jwt);
  }

  render() {
    return(
      <div className="login-page">
        <h1 className="title is-1 has-text-centered">Login</h1>
        <div className="column is-4 is-offset-4">
          <LoginForm onLogin={this.onLogin} />
        </div>
      </div>
    )
  }
}

export default LoginPage;
