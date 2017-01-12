import React from 'react';
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

export default HeaderLoggedOutNav;
