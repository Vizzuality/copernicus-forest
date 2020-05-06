/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './styles.scss';

const SearchBlock = ({ searchRef = {}, outerHeight = 0 }) => {
  return (
    <div className="search-bar-box" ref={searchRef} style={{ height: outerHeight }}>
      <div className="search-bar">
        <div className="bar__inner">
          <div className="site-header-search">
            <form className="views-exposed-form" method="get">
              <div className="form--inline">
                <div>
                  <label htmlFor="edit-search-api-fulltext">Search this site</label>
                  <input
                    data-drupal-selector="edit-search-api-fulltext"
                    type="text"
                    id="edit-search-api-fulltext"
                    name="search_api_fulltext"
                    size="30"
                    maxLength="128"
                    className="form-text"
                  />
                </div>
                <div
                  data-drupal-selector="edit-actions"
                  className="form-actions js-form-wrapper form-wrapper"
                  id="edit-actions--5"
                >
                  <input
                    data-drupal-selector="edit-submit-sitewide-search"
                    type="submit"
                    id="edit-submit-sitewide-search"
                    value="Search"
                    className="button js-form-submit form-submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBlock;
