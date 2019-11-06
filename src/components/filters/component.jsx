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
  parsedYears,
  enabledStartYears,
  endYear,
  enabledEndYears,
  scenario,
  parsedScenarios
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftAlign}>
        {startYear && (
          <Dropdown
            className={styles.dropdown}
            title={`From ${startYear}`}
            handleClick={option => setStartYear(option.value)}
            options={parsedYears}
            enabledOptions={enabledStartYears || parsedYears}
            noBorderLeft
          />
        )}
        {endYear && (
          <Dropdown
            className={styles.dropdown}
            title={`to ${endYear}`}
            handleClick={option => setEndYear(option.value)}
            options={parsedYears}
            enabledOptions={enabledEndYears || parsedYears}
          />
        )}
        {scenario && (
          <Dropdown
            className={styles.dropdownLarge}
            title={
              `Future scenarios: ${scenario &&
                parsedScenarios &&
                parsedScenarios
                  .find(s => s.value === scenario)
                  .label.replace(/^[^-]*[^ -]*- */g, '')}` // split by hyphen, get only 'RCP' part
            }
            options={parsedScenarios}
            handleClick={option => setScenario(option.value)}
          />
        )}
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
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStartYear: PropTypes.func,
  setEndYear: PropTypes.func,
  setScenario: PropTypes.func,
  parsedYears: PropTypes.array,
  enabledStartYears: PropTypes.array,
  endYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enabledEndYears: PropTypes.array,
  scenario: PropTypes.string,
  parsedScenarios: PropTypes.array
};

export default FiltersComponent;
