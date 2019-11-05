/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
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
  const [yearIndex, setYearIndex] = useState(null);

  const timelineSpeedMap = [
    { name: 'x1', value: 1000 },
    { name: 'x2', value: 500 },
    { name: 'x4', value: 250 }
  ];

  const activeScenario = data && activeTab && data[activeTab];
  const { start, end, step } = activeScenario || {};

  useEffect(() => {
    if (!yearIndex) {
      setYearIndex(start);
    }
  }, [yearIndex, start]);

  const toggleTimelineSpeed = () => {
    const nextIndex = timelineSpeedMap.length === speedIndex + 1 ? 0 : speedIndex + 1;
    setSpeedIndex(nextIndex);
  };

  const timelineParams = {
    canPlay: true,
    dateFormat: 'YYYY',
    interval: 'years',
    min: start,
    max: end,
    start,
    end,
    trim: start,
    value: start,
    speed: timelineSpeedMap[speedIndex].value,
    step: step || 1,
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
    customClass: styles.legendItemTimeStep
  };

  const years = data && data[activeTab] && data[activeTab].years;
  const currentYear = years && years[yearIndex];

  return (
    <Component
      timelineSpeed={toggleTimelineSpeed}
      toggleTimelineSpeed={toggleTimelineSpeed}
      timelineSpeedMap={timelineSpeedMap}
      data={data}
      title={title}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      className={className}
      selectedSpeed={timelineSpeedMap[speedIndex] || timelineSpeedMap[0]}
      handleOnChange={handleOnChange}
      hideHeader={hideHeader}
      hideTimeline={hideTimeline}
      setYearIndex={setYearIndex}
      timelineParams={timelineParams}
      currentYear={currentYear}
      years={years}
    />
  );
};

Timeline.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  className: PropTypes.object,
  handleOnChange: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideTimeline: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.object
};

Timeline.defaultProps = {
  handleOnChange: () => {},
  hideHeader: false,
  hideTimeline: false
};

export default Timeline;
