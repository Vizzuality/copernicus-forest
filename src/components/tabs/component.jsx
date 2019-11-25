import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const TabsComponent = ({ data }) => {
  return (
    <div className={styles.tabsBar}>
      {data &&
        data.map(({ name, path, active }) => {
          return (
            <Link
              key={name}
              to={path}
              className={cx(styles.button, { [styles.buttonActive]: active })}
            >
              <span className={styles.buttonText}>{name}</span>
            </Link>
          );
        })}
    </div>
  );
};

TabsComponent.propTypes = {
  data: PropTypes.array
};

export default TabsComponent;
