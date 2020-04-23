import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SpeciesList from 'components/species-list';
import TabsBar from 'components/tabs';
import cx from 'classnames';
import Icon from 'components/icon';
import Modal from 'components/modal';

import styles from './styles.module.scss';

const SpeciesDistributionComponent = props => {
  const {
    match,
    wikiInfo,
    downloadUrl,
    activeSpecies,
    species,
    activeCountry,
    speciesTabsData,
    ContentComponent,
    speciesListVisible,
    toggleSpeciesList,
    activePage
  } = props;

  // Species modal:
  const modalOpenedBefore = sessionStorage.getItem('species');
  const [isModalOpen, setModalOpen] = useState(!modalOpenedBefore);

  return (
    <div className={styles.container}>
      <div className={styles.speciesSidebar}>
        <div 
          className={styles.imageBox}
          style={{
            backgroundImage: `url(${wikiInfo && wikiInfo.thumbnail && wikiInfo.thumbnail.source})`
          }}
        />
        {activeSpecies && (
          <SpeciesList
            species={species.filter(s => s.id !== activeSpecies.id)}
            country={activeCountry}
            activeSpecies={activeSpecies}
            page={activePage}
          />
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
            <Icon name="icon-arrow-left" />
        </button>
          {/* <TabsBar data={speciesTabsData} />
          {downloadUrl && (
            <div className={styles.downloadBtnContainer}>
              <button onClick={() => {}} className={styles.downloadBtn}>
                <Icon name="icon-download" />
              </button>
            </div>
          )} */}
        </div>
        <ContentComponent
          match={match}
          activeSpecies={activeSpecies}
          speciesListVisible={speciesListVisible}
        />
        <Modal
          title="Species distribution data"
          text={`Species distribution models combine information on species occurrence with environmental characteristics to estimate
            the suitable distributional area under current and future conditions using bioclimatic variables derived from Copernicus data.`}
          isOpen={isModalOpen}
          afterOpen={() => sessionStorage.setItem('species', true)}
          handleClose={() => setModalOpen(false)}
        />
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
  toggleSpeciesList: PropTypes.func,
  downloadUrl: PropTypes.string,
  activePage: PropTypes.string
};

export default SpeciesDistributionComponent;
