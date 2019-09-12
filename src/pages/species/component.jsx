import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  return (
    <div className="c-species">
      <span>
        Species in {iso} with id {id}
      </span>
    </div>
  );
}

SpeciesPage.propTypes = {
  match: PropTypes.object
};

export default SpeciesPage;
