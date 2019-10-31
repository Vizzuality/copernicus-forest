/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Component from './component';

import styles from './styles.module.scss';

const Timeline = ({
  data,
  activeTab,
  setActiveTab,
  className,
  title,
  handleOnChange,
  hideHeader,
  hideTimeline
}) => {
  const [speedIndex, setSpeedIndex] = useState(0);
  const timelineSpeedMap = [
    { name: 'x 1', value: 1000 },
    { name: 'x 2', value: 500 },
    { name: 'x 4', value: 250 }
  ];

  const activeScenario = data && activeTab && data[activeTab];

  const toggleTimelineSpeed = () => {
    const nextIndex = timelineSpeedMap.length === speedIndex + 1 ? 0 : speedIndex + 1;
    setSpeedIndex(nextIndex);
  };

  const timelineParams = {
    canPlay: true,
    dateFormat: 'YYYY',
    interval: 'years',
    minDate: `${activeScenario && activeScenario.startYear}-01-01`,
    maxDate: `${activeScenario && activeScenario.endYear}-12-31`,
    startDate: `${activeScenario && activeScenario.startYear}-01-01`,
    endDate: `${activeScenario && activeScenario.endYear}-12-31`,
    trimEndDate: `${activeScenario && activeScenario.startYear}-01-01`,
    speed: timelineSpeedMap[speedIndex].value,
    step: (activeScenario && activeScenario.step) || 10,
    marks: [],
    handleStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      border: '2px solid white',
      borderTopWidth: '5px',
      borderBottomWidth: '5px',
      height: '16px',
      transform: 'translateX(2px)',
      width: '6px',
      zIndex: 2
    },
    trackStyle: {
      backgroundColor: '#DF5127',
      borderRadius: '0',
      height: '6px'
    },
    railStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      height: '6px'
    },
    range: false,
    trackColors: {},
    customClass: styles.legendItemTimeStep
  };

  return (
    <Component
      timelineSpeed={toggleTimelineSpeed}
      toggleTimelineSpeed={toggleTimelineSpeed}
      timelineSpeedMap={timelineSpeedMap}
      timelineParams={timelineParams}
      data={data}
      title={title}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      className={className}
      selectedSpeed={timelineSpeedMap[speedIndex] || timelineSpeedMap[0]}
      handleOnChange={handleOnChange}
      hideHeader={hideHeader}
      hideTimeline={hideTimeline}
    />
  );
};

Timeline.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  className: PropTypes.object,
  handleOnChange: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideTimeline: PropTypes.bool
};

Timeline.defaultProps = {
  handleOnChange: () => {},
  hideHeader: false,
  hideTimeline: false
};

export default Timeline;

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
