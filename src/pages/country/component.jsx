import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function CountryPage({ match }) {
  const { iso } = (match && match.params) || {};
  return (
    <div className="c-country">
      <h2>See species distribution</h2>
      <h2>See bioclimatic variables</h2>
      <h1>{iso}</h1>
    </div>
  );
}

CountryPage.propTypes = {
  match: PropTypes.object
};

export default CountryPage;
