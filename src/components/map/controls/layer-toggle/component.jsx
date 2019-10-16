import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import LayersToggleModal from './modal';

import styles from './styles.module.scss';

const LayerToggleComponent = ({ tooltipRef, toggleLayerActive, setToggleLayerActive }) => {
  return (
    <div className={styles.navigationBar}>
      <button
        data-for="layerTootlip"
        className={styles.navigationButton}
        data-tip=""
        style={{ filter: toggleLayerActive ? 'invert(1)' : 'unset' }}
      >
        <Icon name="icon-stack" />
      </button>
      <ReactTooltip
        id="layerTootlip"
        ref={tooltipRef}
        clickable
        className="layerTooltip"
        effect="solid"
        globalEventOff="click"
        event="click"
        place="right"
        afterShow={() => setToggleLayerActive(true)}
        afterHide={() => setToggleLayerActive(false)}
        overridePosition={({ top, left }) => {
          return { top: top + 98, left };
        }}
      >
        <LayersToggleModal tooltipRef={tooltipRef} />
      </ReactTooltip>
    </div>
  );
};

LayerToggleComponent.propTypes = {
  tooltipRef: PropTypes.object,
  toggleLayerActive: PropTypes.bool,
  setToggleLayerActive: PropTypes.func
};

export default LayerToggleComponent;
