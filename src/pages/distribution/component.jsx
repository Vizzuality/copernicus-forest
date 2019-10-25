/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import LayerToggle from 'components/map/controls/layer-toggle';
import Icon from 'components/icon';

import styles from './styles.module.scss';

const DistributionPageComponent = ({ viewport, setViewport, zoomIn, zoomOut }) => {
  return (
    <div className={styles.distribution}>
      <Map
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
        setViewport={setViewport}
      />
      <Map
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
        setViewport={setViewport}
        customClass="mapCustomClass"
      />
      <div className={styles.navigationBar}>
        <button className={styles.zoomButton} onClick={() => zoomIn()}>
          <Icon name="icon-zoomin" className="menu-icon" />
        </button>
        <button className={styles.zoomButton} onClick={() => zoomOut()}>
          <Icon name="icon-zoomout" className="menu-icon" />
        </button>
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
