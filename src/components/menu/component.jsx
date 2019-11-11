import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';

import './styles.scss';

/*
 * 'About' Sidebar
 */

function useClickOutside(ref, closeMenu) {
  function handleClickOutside(event) {
    if (closeMenu && ref.current && !ref.current.contains(event.target)) {
      closeMenu();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function Menu({ closeMenu, active }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, closeMenu);

  const links = [
    {
      name: 'Species distribution data',
      path: '/SWE/distribution/'
    },
    {
      name: 'Bioclimatic variables data',
      path: '/SWE/bioclimatic/'
    }
    /* {
      name: 'Contact us',
      path: '/contact'
    },
    {
      name: 'Privacy policy',
      path: '/privacy'
    } */
  ];

  return (
    <div className={`c-menu ${active ? '-open' : ''}`} ref={wrapperRef}>
      <button onClick={closeMenu} className="close-button">
        <Icon name="icon-close" className="close-icon" />
        Close
      </button>
      <div className="menu-content">
        <div className="menu-links">
          {links.map(l => (
            <div className="menu-link" key={l.name}>
              <Link to={l.path} onClick={closeMenu}>
                {l.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="partners">
          <p>In partnership with:</p>
          <p className="partner-logo">
            <img src="/logos/copernicus.png" alt="Copernicus" />
          </p>
          <p className="partner-logo">
            <img src="/logos/ECMWF.png" alt="ECMWF" />
          </p>
          <p className="partner-logo">
            <img src="/logos/EC.png" alt="European Comission" />
          </p>
        </div>
        <div className="partners">
          <p>Powered by:</p>
          <p className="partner-logo">
            <img src="/logos/graphcms.svg" alt="Powered by graphCMS" />
          </p>
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  active: PropTypes.bool,
  closeMenu: PropTypes.func
};

export default Menu;
