import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

function SpeciesList({ species, country, activeSpecies }) {
  return (
    <div className="c-species-list">
      <div className="specie __active">{activeSpecies.scientificName}</div>
      <ul>
        {species &&
          country &&
          species.map(specie => (
            <li key={specie.id}>
              <Link to={`/${country.iso}/species/${specie.id}`} className="specie">
                <p>{specie.scientificName}</p>
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
