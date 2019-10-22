import React from 'react';
import PropTypes from 'prop-types';
import SpeciesList from 'components/species-list';
import TabsBar from 'components/tabs';
import cx from 'classnames';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';

import styles from './styles.module.scss';

const SpeciesDistributionComponent = props => {
  const {
    match,
    wikiInfo,
    activeSpecies,
    species,
    activeCountry,
    speciesTabsData,
    ContentComponent,
    speciesListVisible,
    toggleSpeciesList
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
          <SpeciesList species={species} country={activeCountry} activeSpecies={activeSpecies} />
        )}
      </div>
      <div className={cx(styles.content, { [styles.contentStretched]: !speciesListVisible })}>
        <div className={styles.navBar}>
          <button
            onClick={toggleSpeciesList}
            className={cx(styles.toggleBarButton, {
              [styles.expandBarButton]: !speciesListVisible
            })}
          >
            <ArrowIcon />
          </button>
          <TabsBar data={speciesTabsData} />
        </div>
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
  ContentComponent: PropTypes.func,
  speciesListVisible: PropTypes.bool,
  toggleSpeciesList: PropTypes.func
};

export default SpeciesDistributionComponent;
