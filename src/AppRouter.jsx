import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Icons from 'components/icons';
import './App.scss';

const Header = lazy(() => import('components/header'));
const HomePage = lazy(() => import('pages/home'));
const SpeciesPage = lazy(() => import('pages/species'));
const DistributionPage = lazy(() => import('pages/distribution'));
const BioclimaticPage = lazy(() => import('pages/bioclimatic'));
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
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default AppRouter;
