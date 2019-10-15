import React, { useState, useRef } from 'react';
// import PropTypes from 'prop-types';

import Component from './component';

const NavigationBar = () => {
  const [toggleLayerActive, setToggleLayerActive] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <Component
      tooltipRef={tooltipRef}
      toggleLayerActive={toggleLayerActive}
      setToggleLayerActive={setToggleLayerActive}
      // {...props}
    />
  );
};

export default NavigationBar;
