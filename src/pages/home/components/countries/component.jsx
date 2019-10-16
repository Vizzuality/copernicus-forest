import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from 'constants.js';
import styles from './styles.module.scss';

function ChooseCountry() {
  return (
    <div className={styles.countriesModal}>
      <div className="wrapper">
        <div className={styles.row}>
          {COUNTRIES.map(country => (
            <div key={country.name} style={{ gridArea: country.name }}>
              <Link className={styles.imageLink} to={`/${country.iso}/species/`}>
                <img className={styles['shape__no-hover']} src={country.svg} alt={country.name} />
                <img className={styles.shape__hover} src={country.svgActive} alt={country.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseCountry;
