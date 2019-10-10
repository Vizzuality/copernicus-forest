import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function ChooseCountry() {
  return (
    <div className="c-choose-country">
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-2">
            <Link to="/CAN/species/">
              <div className="shape">
                <img className="shape__no-hover" src="/shapes/canada.svg" alt="canada" />
                <img className="shape__hover" src="/shapes/canadaActive.svg" alt="canada" />
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to="/IDN/species/">
              <div className="shape">
                <img className="shape__no-hover" src="/shapes/indonesia.svg" alt="indonesia" />
                <img className="shape__hover" src="/shapes/indonesiaActive.svg" alt="indonesia" />
              </div>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/SWE/species/">
              <div className="shape">
                <img className="shape__no-hover" src="/shapes/sweden.svg" alt="sweden" />
                <img className="shape__hover" src="/shapes/swedenActive.svg" alt="sweden" />
              </div>
            </Link>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/PER/species/">
              <div className="shape">
                <img className="shape__no-hover" src="/shapes/peru.svg" alt="peru" />
                <img className="shape__hover" src="/shapes/peruActive.svg" alt="peru" />
              </div>
            </Link>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/TZA/species/">
              <div className="shape">
                <img className="shape__no-hover" src="/shapes/tanzania.svg" alt="tanzania" />
                <img className="shape__hover" src="/shapes/tanzaniaActive.svg" alt="tanzania" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseCountry;
