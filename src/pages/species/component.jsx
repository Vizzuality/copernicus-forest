import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import Dropdown from 'components/dropdown';
import Dashboard from 'components/dashboard';
import styles from './styles.scss';
import SpeciesList from './components/species-list/component';
import mockData from './data.json';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState(null);

  const [result] = useQuery({
    query: `
    {
      countrySpecieDistributions(where:{
        country: {
          iso: "${iso}"
        }
      }) {
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

  const species = data ? data.countrySpecieDistributions.map(d => d.specie) : [];
  const activeSpecie = species.length ? species.find(sp => sp.id === id) || species[0] : null;
  const activeCountry = data ? data.countries.find(c => c.iso === iso) : null;

  useEffect(() => {
    if (activeSpecie) {
      fetch(`${wikiURL}${activeSpecie && activeSpecie.wikipediaSlug}`)
        .then(r => r.json())
        .then(r => {
          setInfo(r);
        });
    }
    setInfo(null);
  }, [activeSpecie, setInfo]);

  const getPrevSpecie = () => {
    const index = species.findIndex(item => item.id === activeSpecie.id);
    if (index === 0) return '#';
    return species[index - 1] ? species[index - 1].id : '#';
  };
  const getNextSpecie = () => {
    const index = species.findIndex(item => item.id === activeSpecie.id);
    if (index === species.length - 1) return '#';
    if (index === 0) return species[1].id;
    return species[index + 1] ? species[index + 1].id : '#';
  };

  const config = {
    lines: [
      {
        key: 'Optimistic',
        color: styles && styles.colorViolet
      },
      {
        key: 'Business as usual',
        color: styles && styles.colorMustard
      }
    ],
    yAxis: {
      domain: [0, 100],
      unit: '%',
      ticks: [0, 50, 100]
    },
    xAxis: {
      padding: { left: 30, right: 30 }
    },
    grid: {
      vertical: false
    },
    showLegend: true
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
                data.countries &&
                data.countries.map(c => ({
                  label: c.name,
                  value: c.iso,
                  link: `/${c.iso}/species/`
                }))
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
            {wikiInfo && (
              <div className="species-chart">
                <p className="species-chart-title">
                  See in the table below a summary of the proportion of suitable area for this
                  species in the selected country.
                </p>
                <Dashboard data={mockData} config={config} />
              </div>
            )}
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
