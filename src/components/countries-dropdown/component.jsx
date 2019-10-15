import React, { useState } from 'react';
import Icon from 'components/icon';
import { COUNTRIES } from 'constants.js';
import { Link, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';

const CountriesDropdown = () => {
  const match = useRouteMatch('/:iso');

  const { iso } = (match && match.params) || '';
  const [countrySelectorOpen, setCountrySelector] = useState(false);
  const activeCountry = COUNTRIES.find(country => country.iso === iso);

  const toggleCountryDropdown = () => {
    setCountrySelector(!countrySelectorOpen);
  };

  return (
    <>
      <button
        className={cx(styles.countryButton, { [styles.countryButtonActive]: countrySelectorOpen })}
        onClick={toggleCountryDropdown}
      >
        <span className={styles.title}>{activeCountry.name}</span>
        <Icon name="icon-dropdown" className={styles.expandIcon} />
      </button>
      {countrySelectorOpen && (
        <div className={styles.countriesContainer}>
          {COUNTRIES.map(country => (
            <Link
              key={country.iso}
              className={styles.imageLink}
              to={`/${country.iso}/species/`}
              onClick={toggleCountryDropdown}
            >
              <img
                className={cx(styles.shape, styles['shape__no-hover'])}
                src={country.svg}
                alt={country.name}
              />
              <img
                className={cx(styles.shape, styles.shape__hover)}
                src={country.svgActive}
                alt={country.name}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default CountriesDropdown;
