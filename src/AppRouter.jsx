import React, { lazy, Suspense, useState } from 'react';
import { Provider, createClient } from 'urql';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Modal from 'components/modal';
import Icons from 'components/icons';
import './App.scss';

const Header = lazy(() => import('components/header/components/SubHeader'));
const Footer = lazy(() => import('components/footer'));
const HomePage = lazy(() => import('pages/home'));
const SpeciesDistributionComponent = lazy(() => import('pages/species-distribution'));
const BioclimaticPage = lazy(() => import('pages/bioclimatic'));
const Placeholder = () => <div className="c-header" />;

const client = createClient({
  url: 'https://api-eu-central-1.graphcms.com/v2/ck0ns5hjv22o301cb1q61f3ng/master'
});

function AppRouter() {
  const modalOpenedBefore = sessionStorage.getItem('noResponsive');
  const [isOpenModal, setOpenModal] = useState(!modalOpenedBefore);

  return (
    <Router>
      <Provider value={client}>
        {isMobile && isOpenModal ? (
          <Modal
            isOpen={isOpenModal}
            handleClose={() => setOpenModal(false)}
            afterOpen={() => sessionStorage.setItem('noResponsive', true)}
            title="Sorry! no responsive"
            text="This site does not support mobile version yet. Check the desktop version for the full experience."
          />
        ) : (
          <div className="c-app">
            <Icons />
            <Suspense fallback={<Placeholder />}>
              <Header />
              <Switch>
                <Route path="/" exact component={HomePage} />
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
        )}
      </Provider>
    </Router>
  );
}

export default AppRouter;
