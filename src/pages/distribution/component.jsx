/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import LayerToggle from 'components/map/controls/layer-toggle';

import styles from './styles.module.scss';

const DistributionPageComponent = ({ viewport, setViewport, zoomIn, zoomOut }) => {
  return (
    <div className={styles.distribution}>
      <Map
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
        setViewport={setViewport}
      />
      <Map
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
        setViewport={setViewport}
        customClass="mapCustomClass"
      />
      <div className={styles.navigationBar}>
        <button className={styles.zoomInButton} onClick={() => zoomIn()} />
        <button className={styles.zoomOutButton} onClick={() => zoomOut()} />
        <LayerToggle theme={styles.layerToggle} />
      </div>
    </div>
  );
};

DistributionPageComponent.propTypes = {
  viewport: PropTypes.object,
  setViewport: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func
};

export default DistributionPageComponent;
