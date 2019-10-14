import React from 'react';
import { NavigationControl } from 'react-map-gl';
import { ReactComponent as LayersIcon } from 'assets/icons/layers.svg';

import './styles.scss';

const NavigationBar = () => {
  return (
    <div className="navigationBar">
      <NavigationControl showCompass={false} className="zoomButtons" />
      <button className="navigationButton">
        <LayersIcon />
      </button>
    </div>
  );
};

export default NavigationBar;
