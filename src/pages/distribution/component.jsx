/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import LayerToggle from 'components/map/controls/layer-toggle';
import Zoom from 'components/map/controls/zoom';
import RampLegend from 'components/ramp-legend';
import Timeline from 'components/map/controls/timeline';

import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

import styles from './styles.module.scss';

const DistributionPageComponent = ({
  viewport,
  setViewport,
  speciesListVisible,
  activeSpecies,
  activeFutureScenario,
  setFutureScenario,
  futureScenariosData,
  futureScenariosLayers,
  currentScenariosLayers,
  yearIndex,
  setYearIndex,
  setOpacity
}) => {
  return (
    <div className={styles.distribution}>
      <Map
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        setViewport={setViewport}
        showZoom={false}
      >
        {map => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {currentScenariosLayers
              .filter(l => l.active)
              .map(layer => (
                // TODO: fix all eslint-disables
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Layer key={layer.id} {...layer} />
              ))}
          </LayerManager>
        )}
      </Map>
      <Map
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        showZoom={false}
        setViewport={setViewport}
        customClass="mapCustomClass"
      >
        {map => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {futureScenariosLayers
              .filter(l => l.active)
              .map(layer => {
                // TODO: fix all eslint-disables
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <Layer key={layer.id} {...layer} />;
              })}
          </LayerManager>
        )}
      </Map>
      <Timeline
        className={styles.futureScenariosTimeline}
        activeTab={activeFutureScenario}
        setActiveTab={setFutureScenario}
        title="Future distribution"
        data={futureScenariosData}
        yearIndex={yearIndex}
        handleOnChange={index => setYearIndex(() => index)}
      />
      <Timeline title="Current distribution" data={{}} hideTimeline />
      <div className={styles.navigationBar}>
        <Zoom viewport={viewport} setViewport={setViewport} />
        <LayerToggle theme={styles.layerToggle} />
      </div>
      <RampLegend
        title="Committee average"
        transparentRamp={{ colorRGBA: [112, 68, 255, 1] }} // purple
        lowEndValue="0"
        middleValue="0.5"
        highEndValue="1"
        lowEndName="Agreed absences"
        middleName="Uncertain"
        highEndName="Agreed presence"
        activeSpecies={speciesListVisible ? '' : activeSpecies}
        handleOpacity={o => setOpacity(o)}
      />
    </div>
  );
};

DistributionPageComponent.propTypes = {
  viewport: PropTypes.object,
  setViewport: PropTypes.func,
  activeSpecies: PropTypes.object,
  speciesListVisible: PropTypes.bool,
  activeFutureScenario: PropTypes.string,
  setFutureScenario: PropTypes.func,
  futureScenariosData: PropTypes.object,
  futureScenariosLayers: PropTypes.array,
  currentScenariosLayers: PropTypes.array,
  yearIndex: PropTypes.number,
  setYearIndex: PropTypes.func,
  setOpacity: PropTypes.func
};

export default DistributionPageComponent;
