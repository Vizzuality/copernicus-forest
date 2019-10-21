import React from 'react';
import PropTypes from 'prop-types';
import SpeciesList from 'components/species-list';
import TabsBar from 'components/tabs';

import styles from './styles.module.scss';

const SpeciesDistributionComponent = props => {
  const {
    match,
    wikiInfo,
    activeSpecies,
    species,
    activeCountry,
    speciesTabsData,
    ContentComponent
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.speciesSidebar}>
        <img
          src={wikiInfo && wikiInfo.thumbnail && wikiInfo.thumbnail.source}
          alt={
            activeSpecies &&
            `Image not available:
            ${activeSpecies.name}`
          }
        />
        {activeSpecies && (
          <SpeciesList species={species} country={activeCountry} activeSpecie={activeSpecies} />
        )}
      </div>
      <div className={styles.content}>
        <TabsBar data={speciesTabsData} />
        <ContentComponent match={match} />
      </div>
    </div>
  );
};

SpeciesDistributionComponent.propTypes = {
  match: PropTypes.object,
  wikiInfo: PropTypes.object,
  activeSpecies: PropTypes.object,
  species: PropTypes.array,
  activeCountry: PropTypes.object,
  speciesTabsData: PropTypes.array,
  ContentComponent: PropTypes.func
};

export default SpeciesDistributionComponent;
