import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Icons from 'components/icons';
import Header from 'components/header';
import HomePage from 'pages/home';
import SpeciesPage from 'pages/species';
import DistributionPage from 'pages/distribution';
import BioclimaticPage from 'pages/bioclimatic';
import CountryPage from 'pages/country';

import './App.scss';

const Header = lazy(() => import('components/header'));

const HomePage = lazy(() => import('pages/home'));

const SpeciesPage = lazy(() => import('pages/species'));

const DistributionPage = lazy(() => import('pages/distribution'));

const BioclimaticPage = lazy(() => import('pages/bioclimatic'));

const CountryPage = lazy(() => import('pages/country'));

const Placeholder = () => <div className="c-header" />;

function AppRouter() {
  return (
    <Router>
      <div className="c-app">
        <Icons />
        <Suspense fallback={<Placeholder />}>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/:iso/species/:id" component={SpeciesPage} />
            <Route path="/:iso/species/:id/distribution" component={DistributionPage} />
            <Route path="/:iso/bioclimatic/:id" component={BioclimaticPage} />
            <Route path="/:iso" component={CountryPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default AppRouter;
