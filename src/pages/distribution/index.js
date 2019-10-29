import React, { useState } from 'react';
import Component from './component';

const DistributionPage = () => {
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

  return (
    <Component viewport={viewport} setViewport={setViewport} zoomIn={zoomIn} zoomOut={zoomOut} />
  );
};

export default DistributionPage;
