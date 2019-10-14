import React, { useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import cx from 'classnames';

import './styles.scss';
import Menu from 'components/menu';
import Icon from 'components/icon';

function Header() {
  const [menuOpen, showMenu] = useState(false);
  const { pathname } = useLocation();
  const match = useRouteMatch('/:country/:type');

  const isHome = pathname === '/';
  const { country, type } = (match && match.params) || {};

  const urls = {
    species: type === 'species' ? '#' : `/${country}/species/`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${country}/bioclimatic/`
  };

  return (
    <div className={cx('c-header', { __border: !isHome })}>
      <nav className="header-links">
        {/* logo placeholder */}
        <Link to="/" className="logo">
          <span>LOGO</span>
        </Link>
        {!isHome && (
          <Link to={urls.species} className={cx('header-tab', { __active: type === 'species' })}>
            Species distribution
          </Link>
        )}
        {!isHome && (
          <Link
            to={urls.bioclimatic}
            className={cx('header-tab', { __active: type === 'bioclimatic' })}
          >
            Bioclimatic variables
          </Link>
        )}
      </nav>
      <button className="menu-button" onClick={() => showMenu(!menuOpen)}>
        <Icon name="icon-about" className="menu-icon" />
        About
      </button>
      <Menu closeMenu={() => showMenu(false)} active={menuOpen} />
    </div>
  );
}

export default Header;
