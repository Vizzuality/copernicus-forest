/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LegendItemTimeStep } from 'vizzuality-components';

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

  const timelineParams = {
    canPlay: true,
    dateFormat: 'YYYY',
    interval: 'years',
    minDate: '2020-01-01',
    maxDate: '2090-12-31',
    startDate: '2020-01-01',
    endDate: '2090-12-31',
    trimEndDate: '2016-09-14',
    speed: 250,
    step: 1,
    marks: [],
    handleStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      // boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.29)',
      border: '2px solid white',
      height: '12px',
      transform: 'translateY(2px)',
      width: '6px',
      zIndex: 2
    },
    trackStyle: {
      backgroundColor: '#DF5127',
      height: '6px'
    },
    railStyle: {
      backgroundColor: '#5C5C5C',
      borderRadius: '0',
      height: '6px'
    },
    range: false,
    trackColors: {},
    className: 'xd',
    playButton: <div>dups</div>
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
      <LegendItemTimeStep
        playButton={<div>dups</div>}
        activeLayer={{ id: 'id', timelineParams }}
        handleOnChange={date => console.log('handleOnChange')}
        handleChange={date => console.log('handleChange')}
        // handleOnAfterChange={date => console.log('handleOnAfterChange')}
      />
    </div>
  );
};

TimelineComponent.propTypes = {
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
  className: PropTypes.object
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
