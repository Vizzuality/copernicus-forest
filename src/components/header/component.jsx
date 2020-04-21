/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_MENU_FIRST, HEADER_MENU_SECOND } from 'constants.js';
import BgHeader from 'assets/img/bg-header.png';
import LogoImage from 'assets/img/c3s-logo.svg';
import LogosBlock from '../LogosBlock';
import SearchBlock from './components/SearchBlock';

import './styles.scss';

const HeaderComponent = () => {
  const barRef = useRef({});
  const searchRef = useRef({});
  const [logosOuterHeight, setLogosOuterHeight] = useState(0);
  const [searchOuterHeight, setSearchOuterHeight] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const clickToProgram = e => {
    e.preventDefault();
    setOpen(!isOpen);
    const panel = barRef.current;
    const height = logosOuterHeight ? 0 : panel.scrollHeight;
    setLogosOuterHeight(height);
  };

  const clickToSearch = e => {
    e.preventDefault();
    setOpen(!isOpen);
    const panel = searchRef.current;
    const height = searchOuterHeight ? 0 : panel.scrollHeight;
    setSearchOuterHeight(height);
  };

  return (
    <>
      <header role="banner" className="banner" style={{ backgroundImage: `url(${BgHeader})` }}>
        <div className="banner__inner">
          <input
            type="checkbox"
            name="mobile-menu-toggle"
            id="mobile-menu-toggle"
            className="mobile-menu-box"
          />
          <div className="banner__logo">
            <p className="info-link">
              Implemented by <a href="https://www.ecmwf.int">ECMWF</a> as part of{' '}
              <a href="/" onClick={e => clickToProgram(e)}>
                The Copernicus Programme
              </a>
            </p>
            <Link to="/" title="Home" rel="home" id="logo">
              <img className="logo" src={LogoImage} height="66" alt="Home" />
            </Link>
          </div>
          <div className="menus">
            <div className="nav__main-wrapper">
              <nav role="navigation">
                <ul block="ce_main_menu" className="nav__main">
                  {HEADER_MENU_SECOND.map(m => (
                    <li key={m.link} className="menu-item menu-item--collapsed">
                      <Link to={m.link} title={m.title}>
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="nav__sub-wrapper">
              <nav role="navigation">
                <ul block="secondarynavigation" className="nav__sub">
                  {HEADER_MENU_FIRST.map(m => (
                    <li className="menu-item">
                      <Link to={m.link} title={m.title}>
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="mobile-menu-labels">
            <label htmlFor="mobile-menu-toggle" className="mobile-menu-label hidden" />
            <label
              htmlFor="search-toggle"
              className="search-toggle search-label"
              onClick={e => clickToSearch(e)}
            />
          </div>
        </div>
      </header>
      <LogosBlock barRef={barRef} outerHeight={logosOuterHeight} onClose={clickToProgram} />
      <SearchBlock position="header" searchRef={searchRef} outerHeight={searchOuterHeight} />
    </>
  );
};

export default HeaderComponent;
