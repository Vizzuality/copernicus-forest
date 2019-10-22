import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import Icon from 'components/icon';
import cx from 'classnames';
import styles from './styles.module.scss';

const FiltersComponent = ({
  fromY,
  setYearFrom,
  setYearTo,
  setScenario,
  orderedYears,
  enabledFromYears,
  toYear,
  enabledToYears,
  scenario,
  parsedScenarios
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftAlign}>
        <Dropdown
          className={cx(styles.dropdown, styles.borderLeft)}
          title={fromY}
          handleClick={option => setYearFrom(option.value)}
          options={orderedYears}
          enabledOptions={enabledFromYears || orderedYears}
        />
        <Dropdown
          className={styles.dropdown}
          title={toYear}
          handleClick={option => setYearTo(option.value)}
          options={orderedYears}
          enabledOptions={enabledToYears || orderedYears}
        />
        <Dropdown
          className={styles.dropdown}
          title={
            scenario && parsedScenarios && parsedScenarios.find(s => s.value === scenario).label
          }
          options={parsedScenarios}
          handleClick={option => setScenario(option.value)}
        />
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
  fromY: PropTypes.string,
  setYearFrom: PropTypes.func,
  setYearTo: PropTypes.func,
  setScenario: PropTypes.func,
  orderedYears: PropTypes.array,
  enabledFromYears: PropTypes.array,
  toYear: PropTypes.string,
  enabledToYears: PropTypes.array,
  scenario: PropTypes.string,
  parsedScenarios: PropTypes.array
};

export default FiltersComponent;
