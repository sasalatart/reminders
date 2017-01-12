import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderLoggedInNav from './HeaderLoggedInNav';
import HeaderLoggedOutNav from './HeaderLoggedOutNav';
import * as axios from 'axios';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.get('/logout').then(response => {
      this.props.onLogout();
    });
  }

  render() {
    return(
      <header className="nav">
        <div className="container">
          <div className="nav-left">
            <Link to="/" className="nav-item">Reminders</Link>
          </div>
            {
              this.props.loggedIn ?
                <HeaderLoggedInNav route={this.props.route} onLogout={this.onLogout} /> :
                <HeaderLoggedOutNav route={this.props.route} />
            }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  route: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Header;
