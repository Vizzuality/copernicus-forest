import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/icon';
import { COUNTRIES } from 'constants.js';
import { Link, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';

function useClickOutside(ref, closeDropdown) {
  function handleClickOutside(event) {
    if (closeDropdown && ref.current && !ref.current.contains(event.target)) {
      closeDropdown();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function CountriesDropdown() {
  const match = useRouteMatch('/:iso/:page');

  const { iso, page } = (match && match.params) || '';
  const [countrySelectorOpen, setCountrySelector] = useState(false);
  const wrapperRef = useRef(null);
  const closeDropdown = () => setCountrySelector(false);
  useClickOutside(wrapperRef, closeDropdown);
  const activeCountry = COUNTRIES.find(country => country.iso === iso);

  const toggleCountryDropdown = () => {
    setCountrySelector(!countrySelectorOpen);
  };

  return (
    <div ref={wrapperRef}>
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
              to={`/${country.iso}/${page}/`}
              onClick={toggleCountryDropdown}
            >
              <img className={styles['shape__no-hover']} src={country.svg} alt={country.name} />
              <img
                className={cx(styles.shape, styles.shape__hover)}
                src={country.svgActive}
                alt={country.name}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountriesDropdown;
