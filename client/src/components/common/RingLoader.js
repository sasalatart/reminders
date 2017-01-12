import React from 'react';

const Loader = require('halogen/RingLoader');

const RingLoader = ({ color, size }) => {
  return(
    <div className="is-flex is-aligner">
      <Loader color={color} size={size} />
    </div>
  );
}

export default RingLoader;
