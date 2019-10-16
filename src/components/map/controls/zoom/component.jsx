import React from 'react';
import { NavigationControl } from 'react-map-gl';

import styles from './styles.module.scss';

const ZoomComponent = () => {
  return (
    <NavigationControl showCompass={false} className={styles.zoomButtons} />
  )
};

export default ZoomComponent;