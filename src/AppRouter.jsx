import React, { lazy, Suspense } from 'react';
import { Provider, createClient } from 'urql';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Icons from 'components/icons';
import './App.scss';

const Header = lazy(() => import('components/header'));
const Footer = lazy(() => import('components/footer'));
const HomePage = lazy(() => import('pages/home'));
const SpeciesDistributionComponent = lazy(() => import('pages/species-distribution'));
const BioclimaticPage = lazy(() => import('pages/bioclimatic'));
const Placeholder = () => <div className="c-header" />;

const client = createClient({
  url: 'https://api-euwest.graphcms.com/v1/ck0ns5hjv22o301cb1q61f3ng/master'
});

function AppRouter() {
  return (
    <Router>
      <Provider value={client}>
        <div className="c-app">
          <Icons />
          <Suspense fallback={<Placeholder />}>
            <Header />
            <Switch>
              <Route path="/" exact component={SpeciesDistributionComponent} />
              <Redirect
                from="/:iso"
                exact
                to="/:iso/distribution/:id?"
                component={SpeciesDistributionComponent}
              />
              <Route path="/:iso/species/:id?" component={SpeciesDistributionComponent} />
              <Route path="/:iso/distribution/:id?" component={SpeciesDistributionComponent} />
              <Route path="/:iso/bioclimatic/:id?" component={BioclimaticPage} />
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </Provider>
    </Router>
  );
}

export default AppRouter;
