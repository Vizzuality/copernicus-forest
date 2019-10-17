import React, { useState, useRef } from 'react';
import Component from './component';

const LayerToggle = () => {
  const [toggleLayerActive, setToggleLayerActive] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <Component
      tooltipRef={tooltipRef}
      toggleLayerActive={toggleLayerActive}
      setToggleLayerActive={setToggleLayerActive}
    />
  );
};

export default LayerToggle;
