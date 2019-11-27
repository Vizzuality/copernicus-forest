import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

function SpeciesList({ species, country, page, activeSpecies }) {
  const currentQueryParams = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.speciesActive}>{activeSpecies.scientificName}</div>
      <ul className={styles.list}>
        {species &&
          country &&
          species.map(s => {
            const URL = {
              pathname: `/${country.iso}/${page}/${s.id}`,
              search: currentQueryParams ? currentQueryParams.search : ''
            };
            return (
              <li key={s.id}>
                <Link to={URL} className={styles.listItem}>
                  <p>{s.scientificName}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

SpeciesList.propTypes = {
  species: PropTypes.array,
  country: PropTypes.object,
  activeSpecies: PropTypes.object,
  page: PropTypes.string
};

export default SpeciesList;
