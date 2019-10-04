import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './styles.scss';

function SpeciesList({ species, country, activeSpecie }) {
  return (
    <div className="c-species-list">
      {species &&
        species.map(specie => (
          <Link
            key={specie.id}
            to={`/${country.iso}/species/${specie.id}`}
            className={cx('specie', { __active: activeSpecie && activeSpecie.id === specie.id })}
          >
            <p>{specie.name}</p>
          </Link>
        ))}
    </div>
  );
}

SpeciesList.propTypes = {
  species: PropTypes.array,
  country: PropTypes.object,
  activeSpecie: PropTypes.object
};

export default SpeciesList;
