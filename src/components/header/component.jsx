import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BgHeader from 'assets/img/bg-header.png';
import LogoImage from 'assets/img/c3s-logo.svg';
import LogosBlock from './components/LogosBlock';
import './styles.scss';
import SearchBlock from './components/SearchBlock';

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
        <div id="skiptocontent">
          <a href="#maincontent">skip to main content</a>
        </div>
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
                  <li className="menu-item menu-item--collapsed">
                    <a
                      href="https://climate.copernicus.eu/about-us"
                      data-drupal-link-system-path="node/47"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="menu-item menu-item--collapsed">
                    <a
                      href="https://climate.copernicus.eu/what-we-do"
                      data-drupal-link-system-path="node/93"
                    >
                      What we do
                    </a>
                  </li>
                  <li className="menu-item menu-item--collapsed">
                    <a href="http://cds.climate.copernicus.eu/">Data </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="nav__sub-wrapper">
              <nav role="navigation">
                <ul block="secondarynavigation" className="nav__sub">
                  <li className="menu-item">
                    <a href="https://climate.copernicus.eu/news">News</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://climate.copernicus.eu/events">Events</a>
                  </li>
                  <li className="menu-item menu-item--collapsed">
                    <a href="https://climate.copernicus.eu/press-releases">Press</a>
                  </li>
                  <li className="menu-item">
                    <a href="https://climate.copernicus.eu/complete-list-tenders-issued-c3s">
                      Tenders
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="https://climate.copernicus.eu/help-support">Help &amp; Support</a>
                  </li>
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
      <SearchBlock searchRef={searchRef} outerHeight={searchOuterHeight} />
    </>
  );
};

export default HeaderComponent;
