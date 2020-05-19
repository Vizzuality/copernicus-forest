import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import { useSpeciesPerCountry } from 'graphql/queries';
import cx from 'classnames';
import Icon from 'components/icon';
import Chart from 'components/chart';
import styles from './styles.module.scss';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const cartoURL = 'https://simbiotica.carto.com:443/api/v2/sql';
  const [wikiInfo, setInfo] = useState(null);
  const [statusInfo, setStatusInfo] = useState(null);
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

      fetch(`
        ${cartoURL}?q= select * from public.species_status_in_country where spp='${activeSpecies.scientificName}' and country='${iso}'`)
        .then(r => r.json())
        .then(r => (r.rows[0] ? setStatusInfo(r.rows[0]) : setStatusInfo(null)));
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
    <div className={cx(styles['c-species'], styles['l-page'])}>
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className={styles.content}>
          <div className={styles['species-detail']}>
            {species && (
              <div className={styles['species-navbar']}>
                <h1>Species summary</h1>
                <div className={styles.navLinks}>
                  <div className={styles.leftLink}>
                    <Link
                      to={getPrevSpecie(speciesIndex)}
                      className={cx(styles['nav-button'], { disabled: speciesIndex === 0 })}
                    >
                      <Icon name="icon-arrow-left" />
                      Previous species
                    </Link>
                  </div>
                  <div className={styles.rightLink}>
                    <Link
                      to={getNextSpecie(speciesIndex)}
                      className={cx('nav-button', {
                        disabled: speciesIndex === species.length - 1
                      })}
                    >
                      Next species
                      <Icon name="icon-arrow-left" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <h3>
              {activeSpecies && activeSpecies.scientificName}
              {statusInfo && statusInfo.status && (
                <span className={styles.status}>{statusInfo.status}</span>
              )}
            </h3>
            <h1>{activeSpecies && activeSpecies.name}</h1>
            <p className={styles.description}>{wikiInfo && wikiInfo.extract}</p>
            {wikiInfo && (
              <div className={styles['species-chart']}>
                <p className={styles['species-chart-title']}>
                  See in the table below a summary of the proportion of suitable area for this
                  species in the selected country.
                </p>
                <Chart
                  data={activeSpeciesData}
                  config={config}
                  metadata={{ dataset: 'Suitable area', unit: activeSpecies.unit || '%' }}
                />
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
