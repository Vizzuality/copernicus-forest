import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import findIndex from 'lodash/findIndex';
import Dropdown from 'components/dropdown';
import Dashboard from 'components/dashboard';
import './styles.scss';
import SpeciesList from './components/species-list/component';
import mockData from './data.json';

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
          scientificName,
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

  const getPrevSpecie = () => {
    const index = findIndex(species, { id });
    if (id === '1' || index === 0) return '#';
    return species[index - 1] ? species[index - 1].id : '#';
  };
  const getNextSpecie = () => {
    const index = findIndex(species, { id });
    if (index === species.length - 1) return '#';
    if (id === '1') return species[1].id;
    return species[index + 1] ? species[index + 1].id : '#';
  };

  return (
    <div className="c-species l-page">
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className="content">
          <div className="species-sidebar">
            <img
              src={wikiInfo && wikiInfo.thumbnail && wikiInfo.thumbnail.source}
              alt={
                activeSpecie &&
                `Image not available:
                ${activeSpecie.name}`
              }
            />
            <SpeciesList species={species} country={activeCountry} activeSpecie={activeSpecie} />
          </div>
          <div className="species-detail">
            <Dropdown
              className="species-dropdown"
              title={activeCountry && activeCountry.name}
              options={
                countries &&
                countries.map(c => ({ label: c.name, value: c.iso, link: `/${c.iso}/species/1` }))
              }
            />
            {species && (
              <div className="species-navbar">
                {/* provisional arrows */}
                <Link to={getPrevSpecie()} className="nav-button">
                  &lt;
                </Link>
                <Link to={getNextSpecie()} className="nav-button">
                  &gt;
                </Link>
                <Link to={`/${iso}/distribution/${id}`} className="nav-link">
                  See distribution
                </Link>
              </div>
            )}
            <h3>{activeSpecie && activeSpecie.name}</h3>
            <h1>{activeSpecie && activeSpecie.scientificName}</h1>
            <p>{wikiInfo && wikiInfo.extract}</p>

            <p className="species-chart-title">
              See in the table below a summary of the proportion of suitable area for this species
              in the selected country.
            </p>
            <Dashboard data={mockData} />
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
