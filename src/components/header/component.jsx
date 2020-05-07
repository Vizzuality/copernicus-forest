/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { HEADER_MENU_FIRST, HEADER_MENU_SECOND } from 'constants.js';
import BgHeader from 'assets/img/bg-header.png';
import LogoImage from 'assets/img/c3s-logo.svg';
import LogosBlock from '../LogosBlock';
import SearchBlock from './components/SearchBlock';
import SubHeader from './components/SubHeader';
import styles from './styles.module.scss';

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
      <header
        role="banner"
        className={styles.banner}
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className={styles.banner__inner}>
          <input
            type="checkbox"
            name="mobile-menu-toggle"
            id="mobile-menu-toggle"
            className={styles['mobile-menu-box']}
          />
          <div className={styles.banner__logo}>
            <p className={styles['info-link']}>
              Implemented by <a href="https://www.ecmwf.int">ECMWF</a> as part of{' '}
              <a href="/" onClick={e => clickToProgram(e)}>
                The Copernicus Programme
              </a>
            </p>
            <Link to="/" title="Home" rel="home" id="logo">
              <img className={styles.logo} src={LogoImage} height="66" alt="Home" />
            </Link>
          </div>
          <div className={styles.menus}>
            <div className={styles['nav__main-wrapper']}>
              <nav role="navigation">
                <ul block="ce_main_menu" className={styles.nav__main}>
                  {HEADER_MENU_SECOND.map(m => (
                    <li key={m.link} className={styles['menu-item menu-item--collapsed']}>
                      <Link to={m.link} title={m.title}>
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className={styles['nav__sub-wrapper']}>
              <nav role="navigation">
                <ul block="secondarynavigation" className={styles.nav__sub}>
                  {HEADER_MENU_FIRST.map(m => (
                    <li key={m.link} className={styles['menu-item']}>
                      <Link to={m.link} title={m.title}>
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className={styles['mobile-menu-labels']}>
            <label
              htmlFor="mobile-menu-toggle"
              className={cx(styles['mobile-menu-label'], styles.hidden)}
            />
            <label
              htmlFor="search-toggle"
              className={cx(styles['search-toggle'], styles['search-label'])}
              onClick={e => clickToSearch(e)}
            />
          </div>
        </div>
      </header>
      <LogosBlock barRef={barRef} outerHeight={logosOuterHeight} onClose={clickToProgram} />
      <SearchBlock position="header" searchRef={searchRef} outerHeight={searchOuterHeight} />
      <SubHeader />
    </>
  );
};

export default HeaderComponent;
