/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const TimelineComponent = ({ activeTab = 'rcp85', setActiveTab, className }) => {
  const data = {
    title: 'Future distribution',
    tabs: [
      {
        slug: 'rcp45',
        name: 'RCP 4.5'
      },
      {
        slug: 'rcp85',
        name: 'RCP 8.5'
      }
    ]
  };

  return (
    <div className={cx(styles.container, className)}>
      {data && (
        <div className={styles.header}>
          <span className={styles.title}>{data.title}</span>
          {data.tabs.map(({ id, name, slug }) => (
            <button
              id={id}
              className={cx(styles.tab, { [styles.activeTab]: slug === activeTab })}
              onClick={() => setActiveTab(slug)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

TimelineComponent.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  className: PropTypes.object
};

export default TimelineComponent;
