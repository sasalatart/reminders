import React from 'react';
import { browserHistory } from 'react-router';
import Header from './common/Header';
import Footer from './common/Footer';
import * as iziToast from '../../node_modules/izitoast/dist/js/iziToast.min.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    let currentToken = localStorage.getItem('token');
    this.state = {
      loggedIn: (currentToken !== "null" && currentToken !== null)
    }

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(jwt) {
    localStorage.setItem('token', jwt);
    browserHistory.push('/');
    this.setState({ loggedIn: true });
    iziToast.success({ title: 'Welcome back!' });
  }

  onLogout() {
    localStorage.setItem('token', null);
    browserHistory.push('/login');
    this.setState({ loggedIn: false });
    iziToast.success({ title: 'Logged out.' });
  }

  render() {
    return(
      <div className="is-full-height is-flex is-flex-column">
        <Header route={this.props.location.pathname} loggedIn={this.state.loggedIn} onLogout={this.onLogout} />
        <div className="is-body is-flex is-flex-column">
          {React.cloneElement(this.props.children, { onLogin: this.onLogin, onSignup: this.onLogin })}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
