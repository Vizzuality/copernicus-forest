import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function SpeciesList({ species, country, activeSpecies }) {
  return (
    <div className={styles.container}>
      <div className={styles.speciesActive}>{activeSpecies.scientificName}</div>
      <ul className={styles.list}>
        {species &&
          country &&
          species.map(s => (
            <li key={s.id}>
              <Link to={`/${country.iso}/species/${s.id}`} className={styles.listItem}>
                <p>{s.scientificName}</p>
              </Link>
            </li>
          ))}
        {species &&
          country &&
          species.map(s => (
            <li key={s.id}>
              <Link to={`/${country.iso}/species/${s.id}`} className={styles.listItem}>
                <p>{s.scientificName}</p>
              </Link>
            </li>
          ))}
        {species &&
          country &&
          species.map(s => (
            <li key={s.id}>
              <Link to={`/${country.iso}/species/${s.id}`} className={styles.listItem}>
                <p>{s.scientificName}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

SpeciesList.propTypes = {
  species: PropTypes.array,
  country: PropTypes.object,
  activeSpecies: PropTypes.object
};

export default SpeciesList;
