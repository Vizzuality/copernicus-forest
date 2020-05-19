import React from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.scss';
import './styles.scss';

function HomePage() {
  const history = useHistory();

  return (
    <div className="c-home l-page">
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
                Identify <span className="title-color">future</span> suitable areas for forestry.
              </h1>
              <p className="section-body">
                Current species observations are combined with climate variables to describe their
                suitable habitat. Which areas would be favourable for forests in the future?
              </p>
              <button className="button toggle" onClick={() => history.push('/SWE')}>
                See map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
