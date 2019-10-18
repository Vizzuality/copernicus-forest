import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import CountriesDropdown from 'components/countries-dropdown';
import PropTypes from 'prop-types';

import Menu from 'components/menu';
import Icon from 'components/icon';
import TabsBar from 'components/tabs';

import './styles.scss';

const HeaderComponent = props => {
  const { isHome, urls, type, menuOpen, showMenu, isSpeciesDistribution, speciesTabsData } = props;

  return (
    <div>
      <div className={cx('c-header', { __border: !isHome })}>
        <nav className="header-links">
          {/* logo placeholder */}
          <div className="left-aligned">
            <Link to="/" className="logo">
              <span>LOGO</span>
            </Link>
            {!isHome && <CountriesDropdown />}
          </div>
          <div className="right-aligned">
            {!isHome && (
              <>
                <Link
                  to={urls.species}
                  className={cx('header-tab', { __active: type === 'species' })}
                >
                  <span className="tab-title">Species distribution</span>
                </Link>
                <Link
                  to={urls.bioclimatic}
                  className={cx('header-tab', { __active: type === 'bioclimatic' })}
                >
                  <span className="tab-title">Bioclimatic variables</span>
                </Link>
              </>
            )}
            <button
              className={cx('menu-button', { 'menu-button-with-border': !isHome })}
              onClick={() => showMenu(!menuOpen)}
            >
              <Icon name="icon-about" className="menu-icon" />
              About
            </button>
          </div>
        </nav>
        <Menu closeMenu={() => showMenu(false)} active={menuOpen} />
      </div>
      {isSpeciesDistribution && <TabsBar data={speciesTabsData} />}
    </div>
  );
};

HeaderComponent.propTypes = {
  isHome: PropTypes.object,
  urls: PropTypes.object,
  type: PropTypes.string,
  menuOpen: PropTypes.bool,
  showMenu: PropTypes.func,
  isSpeciesDistribution: PropTypes.bool,
  speciesTabsData: PropTypes.object
};

export default HeaderComponent;
