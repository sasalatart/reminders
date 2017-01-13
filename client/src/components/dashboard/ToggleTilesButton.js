import React from 'react';

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

export default ToggleTilesButton;
