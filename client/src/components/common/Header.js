import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as axios from 'axios';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    axios.get('/logout', {
      'headers': { 'token': localStorage.getItem('token') }
    }).then(response => {
      this.props.onLogout();
    });
  }

  render() {
    return(
      <div className="hero-head">
        <header className="nav">
          <div className="container">
            <div className="nav-left">
              <Link to="/" className="nav-item">Reminders</Link>
            </div>
              { this.props.loggedIn ? (
                <div className="nav-right nav-menu">
                  <Link to="/" className="nav-item">Dashboard</Link>
                  <a onClick={this.onLogout} className="nav-item">Logout</a>
                </div>
              ) : (
                <div className="nav-right nav-menu">
                  { this.props.route === '/login' ? (
                    <Link to="/signup" className="nav-item">Signup</Link>
                  ) : (
                    <Link to="/login" className="nav-item">Login</Link>
                  ) }
                </div>
              ) }
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  route: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Header;
