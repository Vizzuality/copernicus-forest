import React, { useState } from 'react';
import Map from 'components/map';
import LayerToggle from 'components/map/controls/layer-toggle';

import styles from './styles.module.scss';

function DistributionPage() {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });

  return (
    <div className={styles.distribution}>
      <Map
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
      />
      <Map
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={{ zoom: 4, latitude: 40, longitude: -5 }}
        showZoom
        zoomButtonsProps={{ theme: styles.zoomButtons }}
        customClass="mapCustomClass"
        setViewport={setViewport}
      />
      <LayerToggle theme={styles.layerToggle} />
    </div>
  );
}

export default DistributionPage;
