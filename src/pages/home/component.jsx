import React from 'react';
import './styles.scss';

import Expand from 'components/expand';
import ChooseCountry from './components/countries';

function HomePage() {
  return (
    <div className="c-home l-page">
      <Expand content={<ChooseCountry />} label="Choose country" />
      <div className="background">
        <img
          src="/background/bg.png"
          srcSet="/background/bg.png 1x, /background/bg@2x.png 2x"
          alt="background"
        />
      </div>
      <div className="section">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-9 col-xs-12">
              {/* TODO: text and header components */}
              <h1 className="section-title">
                Explore species distribution and bioclimatic variables
              </h1>
              <p className="section-body">
                Species distribution models combine information on species occurrence with
                environmental characteristics to estimate the suitable distributional area under
                current and future conditions using bioclimatic variables derived from Copernicus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
