import React, { useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

import Component from './component';

const Header = () => {
  const [menuOpen, showMenu] = useState(false);
  const { pathname } = useLocation();
  const match = useRouteMatch('/:country/:type');

  const isHome = pathname === '/';
  const isSpeciesDistribution = pathname.includes('/species/') || pathname.includes('/distribution/');

  const { country, type } = (match && match.params) || {};

  const urls = {
    species: type === 'species' ? '#' : `/${country}/species/`,
    distribution: type === 'distribution' ? '#' : `/${country}/distribution/undefined`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${country}/bioclimatic/`
  };

  const speciesTabsData = [
    { name: 'Map distribution', path: urls.species, active: pathname.includes('/species/') },
    { name: 'Choose species', path: urls.distribution, active: pathname.includes('/distribution/') }
  ];

  return (
    <Component
      type={type}
      isHome={isHome}
      isSpeciesDistribution={isSpeciesDistribution}
      urls={urls}
      speciesTabsData={speciesTabsData}
      menuOpen={menuOpen}
      showMenu={showMenu}
    />
  );
}

export default Header;
