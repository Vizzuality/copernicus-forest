import React, { useState } from 'react';
import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  const [futureDistribution, setFutureDistribution] = useState(null);

  const zoomIn = () => {
    const { zoom } = viewport;
    const newZoom = zoom + 1 <= 24 ? zoom + 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  const zoomOut = () => {
    const { zoom } = viewport;
    const newZoom = zoom >= 1 ? zoom - 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  return (
    <Component
      viewport={viewport}
      setViewport={setViewport}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      futureDistribution={futureDistribution}
      setFutureDistribution={setFutureDistribution}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}

    />
  );
};

export default DistributionPage;
