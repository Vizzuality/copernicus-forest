/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import LayerToggle from 'components/map/controls/layer-toggle';
import Icon from 'components/icon';
import { vectorLayerCarto } from 'layers';
import { useRouteMatch } from 'react-router-dom';
import RampLegend from 'components/ramp-legend';
import Timeline from 'components/map/controls/timeline';

import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

import styles from './styles.module.scss';

const DistributionPageComponent = ({
  viewport,
  setViewport,
  zoomIn,
  zoomOut,
  speciesListVisible,
  activeSpecies,
  activeFutureScenario,
  setFutureScenario,
  futureScenariosData,
  currentScenariosData
}) => {
  const match = useRouteMatch('/:iso');
  const { iso } = (match && match.params) || '';

  const [opacity, setOpacity] = useState(1);
  const [yearIndex, setYearIndex] = useState(0);

  useEffect(() => {
    if (yearIndex !== 0) {
      setYearIndex(0);
    }
    // in this particular case we want to reset the activeIndex when tab changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFutureScenario]);

  const currentYear =
    futureScenariosData &&
    activeFutureScenario &&
    futureScenariosData[activeFutureScenario].years[yearIndex];

  const cartoLayer = useMemo(
    () =>
      vectorLayerCarto(
        iso,
        activeSpecies && activeSpecies.name,
        activeFutureScenario,
        currentYear,
        opacity
      ),
    [iso, activeSpecies, activeFutureScenario, opacity, currentYear]
  );
  // const cartoLayer = useMemo(() => vectorLayerCarto2(iso, opacity), [iso, opacity]);

  // put active layers in the url
  // along with its opacities
  const layers = useMemo(() => [cartoLayer], [cartoLayer]);

  const activeLayers = useMemo(() => layers.map(l => ({ ...l, active: true })), [layers]);

  return (
    <div className={styles.distribution}>
      <Map
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
        viewport={viewport}
        setViewport={setViewport}
        showZoom={false}
      >
        {/* {map => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {activeLayers
              .filter(l => l.active)
              .map(layer => (
                // TODO: fix all eslint-disables
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Layer key={layer.id} {...layer} />
              ))}
          </LayerManager>
        )} */}
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
            {activeLayers
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
      <Timeline title="Current distribution" data={currentScenariosData} hideTimeline />
      <div className={styles.navigationBar}>
        <button className={styles.zoomButton} onClick={() => zoomIn()}>
          <Icon name="icon-zoomin" className="menu-icon" />
        </button>
        <button className={styles.zoomButton} onClick={() => zoomOut()}>
          <Icon name="icon-zoomout" className="menu-icon" />
        </button>
        <LayerToggle theme={styles.layerToggle} />
      </div>
      <RampLegend
        title="Committee average"
        transparentRamp={{ colorRGBA: [112, 68, 255, 1] }} // purple
        lowEndValue={0}
        middleValue={0.5}
        highEndValue={1}
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
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  activeSpecies: PropTypes.object,
  speciesListVisible: PropTypes.bool,
  activeFutureScenario: PropTypes.string,
  setFutureScenario: PropTypes.func,
  futureScenariosData: PropTypes.object,
  currentScenariosData: PropTypes.object
};

export default DistributionPageComponent;
