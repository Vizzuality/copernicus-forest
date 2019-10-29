import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavigationControl } from 'react-map-gl';

import styles from './styles.module.scss';

const ZoomComponent = ({ theme }) => {
  return <NavigationControl showCompass={false} className={cx(styles.zoom, theme)} />;
};

ZoomComponent.propTypes = {
  theme: PropTypes.object
};

export default ZoomComponent;
