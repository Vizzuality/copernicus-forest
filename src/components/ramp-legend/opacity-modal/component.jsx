/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const OpacityModalComponent = ({ handleChangeOpacity, layerOpacity }) => {
  const sliderStyles = {
    handleStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      border: '2px solid #313131',
      height: '12px',
      // transform: 'translateX(10%)',
      width: '6px',
      zIndex: 2
    },
    trackStyle: {
      backgroundColor: '#DF5127',
      borderRadius: '0',
      height: '6px'
    },
    railStyle: {
      backgroundColor: '#999999',
      borderRadius: '0',
      height: '6px'
    }
  };

  return (
    <div className={styles.opacityModal}>
      <span className={styles.title}>Opacity</span>
      <Slider
        min={0}
        max={100}
        defaultValue={60}
        onChange={handleChangeOpacity}
        className={styles.slider}
        {...sliderStyles}
      />
      <span className={styles.value}>{layerOpacity}%</span>
    </div>
  );
};

OpacityModalComponent.propTypes = {
  handleChangeOpacity: PropTypes.func,
  layerOpacity: PropTypes.number
};

export default OpacityModalComponent;
