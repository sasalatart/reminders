import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HeaderLoggedOutNav = ({ route }) => {
  return(
    <div className="nav-right nav-menu">
      {
        route === '/login' ?
          <Link to="/signup" className="nav-item">Signup</Link> :
          <Link to="/login" className="nav-item">Login</Link>
      }
    </div>
  );
}

HeaderLoggedOutNav.propTypes = {
  route: PropTypes.string.isRequired
}

export default HeaderLoggedOutNav;
