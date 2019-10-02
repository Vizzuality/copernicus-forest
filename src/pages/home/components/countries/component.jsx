import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function ChooseCountry() {
  return (
    <div className="c-choose-country">
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-2">
            <Link to="/CAN/species/1234">
              <div className="country">
                <img src="/shapes/tanzania.svg" alt="tanzania" />
                Canada
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to="/IDN/species/1234">
              <div className="country">
                <img src="/shapes/tanzania.svg" alt="tanzania" />
                Indonesia
              </div>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/SWE/species/1234">
              <div className="country">
                <img src="/shapes/tanzania.svg" alt="tanzania" />
                Sweden
              </div>
            </Link>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/PER/species/1234">
              <div className="country">
                <img src="/shapes/tanzania.svg" alt="tanzania" />
                Peru
              </div>
            </Link>
          </div>
          <div className="col-sm-3 col-sm-offset-1">
            <Link to="/TZA/species/1234">
              <div className="country">
                <img src="/shapes/tanzania.svg" alt="tanzania" />
                Tanzania
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseCountry;
