import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import { useSpeciesPerCountry } from 'graphql/queries';
import cx from 'classnames';
import Chart from 'components/chart';
import Modal from 'components/modal';
import styles from './styles.scss';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState(null);

  const { fetching, data, error } = useSpeciesPerCountry(iso);
  const getScenarioName = key =>
    data && data.scenarios && data.scenarios.find(sc => sc.key === key).shortName;

  const species = data ? data.species : [];
  const speciesData = data ? groupBy(data.countrySpecieDistributions, 'specie.scientificName') : {};
  const activeSpecies = species.length ? species.find(sp => sp.id === id) || species[0] : null;
  const activeSpeciesDataByYear =
    speciesData && activeSpecies
      ? groupBy(speciesData[activeSpecies.scientificName], 'year')
      : null;
  const activeSpeciesData = activeSpeciesDataByYear
    ? Object.values(activeSpeciesDataByYear).map(scenariosByYear => ({
        name: scenariosByYear[0].year,
        ...scenariosByYear.reduce(
          (acc, sc) => ({ ...acc, [getScenarioName(sc.scenario.key)]: sc.summary * 100 }),
          {}
        )
      }))
    : [];

  useEffect(() => {
    if (activeSpecies) {
      fetch(`${wikiURL}${activeSpecies && activeSpecies.wikipediaSlug}`)
        .then(r => r.json())
        .then(r => {
          setInfo(r);
        });
    }
    setInfo(null);
  }, [activeSpecies, setInfo]);

  const getPrevSpecie = index => {
    if (index === 0) return '#';
    return species[index - 1] ? species[index - 1].id : '#';
  };
  const getNextSpecie = index => {
    if (index === species.length - 1) return '#';
    if (index === 0) return species[1].id;
    return species[index + 1] ? species[index + 1].id : '#';
  };

  const colors = [styles.colorViolet, styles.colorMustard, styles.colorViolet];

  const config = {
    lines:
      data && styles && data.scenarios.map((sc, i) => ({ key: sc.shortName, color: colors[i] })),
    yAxis: {
      domain: [0, 100],
      unit: '%',
      ticks: [0, 50, 100]
    },
    xAxis: {
      padding: { left: 30, right: 30 }
    },
    grid: {
      vertical: false,
      strokeDasharray: '3 3'
    },
    showLegend: true,
    height: 200
  };

  const speciesIndex = species.length && species.findIndex(item => item.id === activeSpecies.id);

  return (
    <div className="c-species l-page">
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className="content">
          {species && (
            <div className="species-navbar">
              {/* provisional arrows. TODO: change this ! */}
              <Link
                to={getPrevSpecie(speciesIndex)}
                className={cx('nav-button', { disabled: speciesIndex === 0 })}
              >
                &lt;
              </Link>
              <Link
                to={getNextSpecie(speciesIndex)}
                className={cx('nav-button', { disabled: speciesIndex === species.length - 1 })}
              >
                &gt;
              </Link>
            </div>
          )}
          <div className="species-detail">
            <h3>{activeSpecies && activeSpecies.scientificName}</h3>
            <h1>{activeSpecies && activeSpecies.name}</h1>
            <p className="description">{wikiInfo && wikiInfo.extract}</p>
            {wikiInfo && (
              <div className="species-chart">
                <p className="species-chart-title">
                  See in the table below a summary of the proportion of suitable area for this
                  species in the selected country.
                </p>
                <Chart
                  data={activeSpeciesData}
                  config={config}
                  metadata={{ dataset: activeSpecies.name }}
                />
                {/* <p className="species-source">Source: <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://en.wikipedia.org/wiki/${activeSpecies.wikipediaSlug}`}
                >
                  wikipedia.com
                </a></p> */}
              </div>
            )}
            <Modal
              title="Species distribution data"
              text={`Species distribution models combine information on species occurrence with environmental characteristics to estimate
                the suitable distributional area under current and future conditions using bioclimatic variables derived from Copernicus data.`}
              storageKey="species"
            />
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
