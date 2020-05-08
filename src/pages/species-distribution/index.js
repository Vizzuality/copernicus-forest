import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useSpeciesPerCountry } from 'graphql/queries';
import Distribution from 'pages/distribution';
import Species from 'pages/species';

import Component from './component';

const SpeciesDistribution = () => {
  const match = useRouteMatch('/:iso/:type/:id?');
  const { iso, type, id } = (match && match.params) || {};

  const history = useHistory();
  const { pathname } = useLocation();
  const { data } = useSpeciesPerCountry(iso);

  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState(null);
  const [speciesListVisible, setSpeciesListVisible] = useState(true);

  const species = data ? data.species : [];

  useEffect(() => {
    if (iso && type && species && species.length && !id) {
      history.push(`/${iso}/${type}/${species[0].id}`);
    }
  }, [history, id, iso, pathname, species, type]);

  const activeSpecies = species.length ? species.find(sp => sp.id === id) || species[0] : null;
  const activeCountry = data ? data.countries.find(c => c.iso === iso) : null;
  const urls = {
    species: type === 'species' ? '#' : `/${iso}/species/${id}`,
    distribution: type === 'distribution' ? '#' : `/${iso}/distribution/${id}`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${iso}/bioclimatic/${id}`
  };

  const speciesTabsData = [
    {
      name: 'Species summary',
      path: urls.species,
      active: pathname.includes('/species'),
      page: 'species',
      component: Species
    },
    {
      name: 'Map distribution',
      path: urls.distribution,
      active: pathname.includes('/distribution'),
      page: 'distribution',
      component: Distribution
    }
  ];

  const activePage = speciesTabsData.find(({ active }) => active) || {};

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

  const toggleSpeciesList = () => {
    setSpeciesListVisible(!speciesListVisible);
  };

  return (
    <Component
      match={match}
      wikiInfo={wikiInfo}
      activeSpecies={activeSpecies}
      species={species}
      activePage={activePage.page}
      activeCountry={activeCountry}
      speciesTabsData={speciesTabsData}
      ContentComponent={activePage.component}
      speciesListVisible={speciesListVisible}
      toggleSpeciesList={toggleSpeciesList}
    />
  );
};

export default SpeciesDistribution;
