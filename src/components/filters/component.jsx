import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';
import styles from './styles.module.scss';

const FiltersComponent = ({
  startYear,
  setStartYear,
  setEndYear,
  setScenario,
  orderedYears,
  enabledStartYears,
  endYear,
  enabledEndYears,
  scenario,
  parsedScenarios
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftAlign}>
        {startYear && <Dropdown
          className={styles.dropdown}
          title={`From ${startYear}`}
          handleClick={option => setStartYear(option.value)}
          options={orderedYears}
          enabledOptions={enabledStartYears || orderedYears}
          noBorderLeft
        />}
        {endYear && <Dropdown
          className={styles.dropdown}
          title={`to ${endYear}`}
          handleClick={option => setEndYear(option.value)}
          options={orderedYears}
          enabledOptions={enabledEndYears || orderedYears}
        />}
        {scenario && <Dropdown
          className={styles.dropdown}
          title={
            scenario && parsedScenarios && parsedScenarios.find(s => s.value === scenario).label
          }
          options={parsedScenarios}
          handleClick={option => setScenario(option.value)}
        />}
      </div>
      <div className={styles.rightAlign}>
        <button onClick={() => {}} className={styles.button}>
          <Icon name="icon-download" className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

FiltersComponent.propTypes = {
  startYear: PropTypes.string,
  setStartYear: PropTypes.func,
  setEndYear: PropTypes.func,
  setScenario: PropTypes.func,
  orderedYears: PropTypes.array,
  enabledStartYears: PropTypes.array,
  endYear: PropTypes.string,
  enabledEndYears: PropTypes.array,
  scenario: PropTypes.string,
  parsedScenarios: PropTypes.array
};

export default FiltersComponent;
