/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
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
  setYearIndex
}) => {
  return (
    <div className={styles.distribution}>
      <Map viewport={viewport} setViewport={setViewport}>
        {map => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {currentScenariosLayers
              .filter(l => l.active)
              .map(layer => {
                // TODO: fix all eslint-disables
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <Layer key={layer.id} {...layer} />;
              })}
          </LayerManager>
        )}
      </Map>
      <Map viewport={viewport} setViewport={setViewport} customClass="mapCustomClass">
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
      <Timeline
        title="Current distribution"
        data={currentScenariosData}
        hideTimeline
        activeTab={activeCurrentScenario}
        setActiveTab={setCurrentScenario}
      />
      <div className={styles.navigationBar}>
        <Zoom viewport={viewport} setViewport={setViewport} />
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
  setYearIndex: PropTypes.func
};

export default DistributionPageComponent;
