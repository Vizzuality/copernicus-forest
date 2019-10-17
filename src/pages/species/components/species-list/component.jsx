import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

function SpeciesList({ species, country, activeSpecie }) {
  return (
    <div className="c-species-list">
      <div className="specie __active">{activeSpecie.scientificName}</div>
      <ul>
        {species &&
          country &&
          species.map(specie => (
            <li>
              <Link key={specie.id} to={`/${country.iso}/species/${specie.id}`} className="specie">
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
  activeSpecie: PropTypes.object
};

export default SpeciesList;
