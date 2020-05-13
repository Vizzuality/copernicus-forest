import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from 'constants.js';
import cx from 'classnames';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from './styles.module.scss';
import './styles.scss';

function HomePage() {
  return (
    <div className="c-home l-page">
      <ReactFullpage
        licenseKey={process.env.fullpage_license}
        render={({ fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className="background">
                  <img
                    src="/background/bg.png"
                    srcSet="/background/bg.png 1x, /background/bg@2x.png 2x"
                    alt="background"
                  />
                </div>
                <div className={cx('wrapper', styles.wrapper)}>
                  <div className="row">
                    <div className="col-md-10 col-xs-12">
                      <h1 className="section-title">
                        Identify <span className="title-color">future</span> suitable areas for
                        forestry.
                      </h1>
                      <p className="section-body">
                        Current species observations are combined with climate variables to describe
                        their suitable habitat. Which areas would be favourable for forests in the
                        future?
                      </p>
                      <button
                        className="button toggle"
                        onClick={() => fullpageApi.moveSectionDown()}
                      >
                        Choose country
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className={cx('wrapper', styles.wrapper, styles.countriesSection)}>
                  <div className={styles.row}>
                    {COUNTRIES.map(country => (
                      <div key={country.name} style={{ gridArea: country.name }}>
                        <Link className={styles.imageLink} to={`/${country.iso}/distribution`}>
                          <img
                            className={styles['shape__no-hover']}
                            src={country.svg}
                            alt={country.name}
                          />
                          <img
                            className={styles.shape__hover}
                            src={country.svgActive}
                            alt={country.name}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}

export default HomePage;
