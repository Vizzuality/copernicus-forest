/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LegendItemTimeStep } from 'vizzuality-components';
import Icon from 'components/icon';

import styles from './styles.module.scss';

const TimelineComponent = ({
  activeTab,
  setActiveTab,
  className,
  toggleTimelineSpeed,
  title,
  data,
  selectedSpeed,
  timelineParams,
  handleOnChange,
  hideHeader,
  hideTimeline
}) => {
  return (
    <div className={cx(styles.container, className)}>
      {!hideHeader && data && (
        <div className={styles.header}>
          <button className={styles.infoButton}>
            <Icon name="icon-info" />
          </button>
          <span className={styles.title}>{title}</span>
          {Object.keys(data).length > 1 &&
            Object.keys(data).map(key => (
              <button
                id={key}
                className={cx(styles.tab, { [styles.activeTab]: key === activeTab })}
                onClick={() => setActiveTab(key)}
              >
                {data[key].name}
              </button>
            ))}
        </div>
      )}
      {!hideTimeline && (
        <div className={styles.timeline}>
          <LegendItemTimeStep
            activeLayer={{ id: 'id', timelineParams }}
            handleOnChange={handleOnChange}
            handleChange={() => {}}
          />
          <button className={styles.speedButton} onClick={toggleTimelineSpeed}>
            {selectedSpeed.name}
          </button>
        </div>
      )}
    </div>
  );
};

TimelineComponent.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  className: PropTypes.object,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  data: PropTypes.object,
  hideHeader: PropTypes.bool,
  hideTimeline: PropTypes.bool,
  timelineParams: PropTypes.object,
  selectedSpeed: PropTypes.object,
  toggleTimelineSpeed: PropTypes.func
};

export default TimelineComponent;
