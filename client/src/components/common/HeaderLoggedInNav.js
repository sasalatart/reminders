import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HeaderLoggedInNav = ({ route, onLogout }) => {
  return(
    <div className="nav-right nav-menu">
      <Link to="/" className="nav-item">Dashboard</Link>

      {
        route !== '/new_reminder' &&
        <Link to="/new_reminder" className="nav-item">New Reminder</Link>
      }

      <a onClick={onLogout} className="nav-item">Logout</a>
    </div>
  );
}

HeaderLoggedInNav.propTypes = {
  route: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default HeaderLoggedInNav;
