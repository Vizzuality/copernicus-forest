import React from 'react';
import './styles.scss';

import Expand from 'components/expand';

function ChooseCountry() {
  return (
    <div className="c-choose-country">
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-2">
            <button>
              <img src="/shapes/tanzania.svg" alt="tanzania" />
              Canada
            </button>
          </div>
          <div className="col-sm-4">
            <button>
              <img src="/shapes/tanzania.svg" alt="tanzania" />
              Indonesia
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-1">
            <button>
              <img src="/shapes/tanzania.svg" alt="tanzania" />
              Sweden
            </button>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <button>
              <img src="/shapes/tanzania.svg" alt="tanzania" />
              Peru
            </button>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <button>
              <img src="/shapes/tanzania.svg" alt="tanzania" />
              Tanzania
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="c-home">
      <Expand content={<ChooseCountry />} />
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
