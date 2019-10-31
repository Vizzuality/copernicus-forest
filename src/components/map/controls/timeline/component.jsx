/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LegendItemTimeStep } from 'vizzuality-components';

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
  handleOnChange: PropTypes.func
};

export default TimelineComponent;

// {...this.props}
// activeLayer={{
//   ...activeLayer,
//   timelineParams: {
//     ...activeLayer.timelineParams,
//     marks: this.props.marks,
//     handleStyle: {
//       backgroundColor: 'white',
//       borderRadius: '2px',
//       boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
//       border: '0px',
//       zIndex: 2
//     }
//   }
// }}
// />
