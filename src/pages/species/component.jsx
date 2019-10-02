import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'urql';
import './styles.scss';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const [result] = useQuery({
    query: `{ countries { iso, name } }`
  });

  const { fetching, data, error } = result;

  let countries = [];
  let activeCountry;

  if (data) {
    countries = data.countries;
    activeCountry = data.countries.find(c => c.iso === iso);
  }

  return (
    <div className="c-species">
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className="content">
          <p>We have data from {countries.map(c => c.name).join(' and ')}.</p>
          <p>
            Species in {activeCountry ? activeCountry.name : iso} with id {id}
          </p>
        </div>
      )}
    </div>
  );
}

SpeciesPage.propTypes = {
  match: PropTypes.object
};

export default SpeciesPage;
