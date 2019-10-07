import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'urql';
import Dropdown from 'components/dropdown';
import './styles.scss';
import SpeciesList from './components/species-list/component';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState('');
  const [countries, setCountries] = useState([]);
  const [activeCountry, setCountry] = useState(null);
  const [species, setSpecies] = useState([]);
  const [activeSpecie, setSpecie] = useState(null);

  const [result] = useQuery({
    query: `
    {
      countrySpecieDistributions(where:{
        country: {
          iso: "${iso}"
        }
      }) {
        country {
          iso,
          name
        },
        specie {
          name,
          wikipediaSlug,
          id
        }
      },
      countries {
        iso,
        name
      }
    }
    `
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (data) {
      const distrib = data.countrySpecieDistributions;
      const countryList = data.countries;
      setCountry(distrib && distrib[0] && distrib[0].country);
      setSpecies(distrib.map(d => d.specie));
      setCountries(countryList);
    }
  }, [data, setCountry, setSpecies, setCountries]);

  useEffect(() => {
    if (species && species.length) setSpecie(species.find(sp => sp.id === id) || species[0]); // TODO: modify with right IDs
  }, [id, species, setSpecie]);

  useEffect(() => {
    if (activeSpecie) {
      fetch(`${wikiURL}${activeSpecie && activeSpecie.wikipediaSlug}`)
        .then(r => r.json())
        .then(r => {
          setInfo(r);
        });
    }
  }, [activeSpecie, setInfo]);

  return (
    <div className="c-species l-page">
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className="content">
          <div className="species-sidebar">
            <img
              src={wikiInfo && wikiInfo.thumbnail && wikiInfo.thumbnail.source}
              alt={activeSpecie && activeSpecie.name}
            />
            <SpeciesList species={species} country={activeCountry} activeSpecie={activeSpecie} />
          </div>
          <Dropdown
            title={activeCountry && activeCountry.name}
            list={countries && countries.map(c => ({ label: c.name, value: c.iso }))}
          />
          <div className="species-detail">
            <h1>{activeSpecie && activeSpecie.name}</h1>
            <p>{wikiInfo && wikiInfo.extract}</p>
          </div>
        </div>
      )}
    </div>
  );
}

SpeciesPage.propTypes = {
  match: PropTypes.object
};

export default SpeciesPage;
