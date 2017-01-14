import React, { PropTypes } from 'react';

const Loader = require('halogen/RingLoader');

const RingLoader = ({ color, size }) => {
  return(
    <div className="is-flex is-aligner">
      <Loader color={color} size={size} />
    </div>
  );
}

RingLoader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
}

export default RingLoader;
