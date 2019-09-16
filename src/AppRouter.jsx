import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Icons from 'components/icons';
import Header from 'components/header';
import HomePage from 'pages/home';
import SpeciesPage from 'pages/species';
import DistributionPage from 'pages/distribution';
import BioclimaticPage from 'pages/bioclimatic';
import CountryPage from 'pages/country';

import './App.scss';

function AppRouter() {
  return (
    <Router>
      <div className="c-app">
        <Icons />
        <Header />

        <Route path="/" exact component={HomePage} />
        <Route path="/:iso/species/:id" exact component={SpeciesPage} />
        <Route path="/:iso/species/:id/distribution" exact component={DistributionPage} />
        <Route path="/:iso/bioclimatic/:id" exact component={BioclimaticPage} />
        <Route path="/:iso" exact component={CountryPage} />
      </div>
    </Router>
  );
}

export default AppRouter;
