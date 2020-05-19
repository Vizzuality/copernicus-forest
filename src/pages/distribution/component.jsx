/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import Zoom from 'components/map/controls/zoom';
import RampLegend from 'components/ramp-legend';
import Timeline from 'components/map/controls/timeline';
import Modal from 'components/modal';

import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { MODAL_INFO_DATA } from 'constants.js';
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
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(MODAL_INFO_DATA[0]);
  const openModalAction = id => {
    const info = MODAL_INFO_DATA[id];
    setModalInfo(info);
    setOpenModal(true);
  };

  return (
    <>
      <div className={styles.distribution}>
        <Map scrollZoom={false} viewport={viewport} setViewport={setViewport}>
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
        <Map
          scrollZoom={false}
          viewport={viewport}
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
          clickOnInfo={() => openModalAction('futureDistribution')}
        />
        <Timeline
          title="Current distribution"
          data={currentScenariosData}
          hideTimeline
          activeTab={activeCurrentScenario}
          setActiveTab={setCurrentScenario}
          clickOnInfo={() => openModalAction('currentDistribution')}
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
          clickOnInfo={() => openModalAction('committeeAverage')}
        />
      </div>
      {modalInfo && (
        <Modal
          isOpen={isOpenModal}
          handleClose={() => setOpenModal(false)}
          title={modalInfo.title ? modalInfo.title : ''}
          text={modalInfo.text ? modalInfo.text : ''}
        />
      )}
    </>
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
