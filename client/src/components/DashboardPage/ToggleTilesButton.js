import React, { PropTypes } from 'react';

const ToggleTilesButton = ({ title, isActiveClass, toggleTiles, icon}) => {
  return(
    <li className={isActiveClass}>
      <a onClick={toggleTiles}>
        <span className="icon is-large">
          <i className={"fa fa-" + icon}></i>
        </span>
        <span>{title}</span>
      </a>
    </li>
  )
}

ToggleTilesButton.propTypes = {
  title: PropTypes.string.isRequired,
  isActiveClass: PropTypes.string.isRequired,
  toggleTiles: PropTypes.func.isRequired,
  icon: PropTypes.string
}

export default ToggleTilesButton;
