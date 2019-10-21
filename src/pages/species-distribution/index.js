import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useSpeciesPerCountry } from 'graphql/queries';
import Distribution from 'pages/distribution';
import Species from 'pages/species';

import Component from './component';

const SpeciesDistribution = () => {
  const match = useRouteMatch('/:iso/:type/:id');
  const { iso, type, id } = (match && match.params) || {};

  const { pathname } = useLocation();
  const { data } = useSpeciesPerCountry(iso);

  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState(null);

  const species = data ? data.species : [];
  const activeSpecies = species.length ? species.find(sp => sp.id === id) || species[0] : null;
  const activeCountry = data ? data.countries.find(c => c.iso === iso) : null;

  const urls = {
    species: type === 'species' ? '#' : `/${iso}/species/${id}`,
    distribution: type === 'distribution' ? '#' : `/${iso}/distribution/${id}`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${iso}/bioclimatic/${id}`
  };

  const speciesTabsData = [
    {
      name: 'Choose species',
      path: urls.species,
      active: pathname.includes('/species/'),
      component: Species
    },
    {
      name: 'Map distribution',
      path: urls.distribution,
      active: pathname.includes('/distribution/'),
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

  return (
    <Component
      match={match}
      wikiInfo={wikiInfo}
      activeSpecies={activeSpecies}
      species={species}
      activeCountry={activeCountry}
      speciesTabsData={speciesTabsData}
      ContentComponent={activePage.component}
    />
  );
};

export default SpeciesDistribution;
