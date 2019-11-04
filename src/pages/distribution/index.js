import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });

  const zoomIn = () => {
    const { zoom } = viewport;
    const newZoom = zoom + 1 <= 24 ? zoom + 1 : zoom;
    setViewport({ ...viewport, zoom: newZoom });
  };

  const zoomOut = () => {
    const { zoom } = viewport;
    const newZoom = zoom >= 1 ? zoom - 1 : zoom;
    setViewport({ ...viewport, zoom: newZoom });
  };

  const handleViewport = debounce(vw => {
    setViewport(vw);
  }, 50);

  return (
    <Component
      viewport={viewport}
      setViewport={handleViewport}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default DistributionPage;
