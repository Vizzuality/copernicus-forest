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
  currentScenariosData,
  currentScenariosLayers,
  activeCurrentScenario,
  setCurrentScenario,
  yearIndex,
  setYearIndex,
  setOpacity
}) => {
  return (
    <div className={styles.distribution}>
      <Map viewport={viewport} setViewport={setViewport}>
      {map => {
          map.addLayer({
            'id': 'urban-world',
            'type': 'raster',
            'source': {
              'type': 'raster',
              "tiles": ["https://storage.cloud.google.com/forest-forward/tilesets/urbanWorld/{z}/{x}/{y}.png"],
              "tileSize": 1,
              },
              minzoom: 0,
              maxzoom: 12
            // 'layout': {},
            // 'paint': {
            // 'fill-color': '#f08',
            // 'fill-opacity': 0.4
            // }
            // This is the important part of this example: the addLayer
            // method takes 2 arguments: the layer as an object, and a string
            // representing another layer's name. if the other layer
            // exists in the stylesheet already, the new layer will be positioned
            // right before that layer in the stack, making it possible to put
            // 'overlays' anywhere in the layer stack.
            // Insert the layer beneath the first symbol layer.
            });
          return (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {currentScenariosLayers
              .filter(l => l.active)
              .map(layer => {
                // TODO: fix all eslint-disables
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <Layer key={layer.id} {...layer} />;
              })}
          </LayerManager>
        )}}
      </Map>
      <Map viewport={viewport} setViewport={setViewport} customClass="mapCustomClass">
        {map => {

          return (
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {futureScenariosLayers
                .filter(l => l.active)
                .map(layer => {
                  // TODO: fix all eslint-disables
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  return <Layer key={layer.id} {...layer} />;
                })}
            </LayerManager>
        )}}
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
      <Timeline
        title="Current distribution"
        data={currentScenariosData}
        hideTimeline
        activeTab={activeCurrentScenario}
        setActiveTab={setCurrentScenario}
      />
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
  activeCurrentScenario: PropTypes.string,
  setCurrentScenario: PropTypes.func,
  currentScenariosData: PropTypes.object,
  currentScenariosLayers: PropTypes.array,
  yearIndex: PropTypes.number,
  setYearIndex: PropTypes.func,
  setOpacity: PropTypes.func
};

export default DistributionPageComponent;
