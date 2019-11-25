import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
      key: 'species',
      path: '/SWE/distribution/',
      content: `Species distribution models combine information on species occurrence with environmental characteristics to estimate
        the suitable distributional area under current and future conditions using bioclimatic variables derived from Copernicus data.`
    },
    {
      name: 'Bioclimatic variables data',
      key: 'bioclimatic',
      path: '/SWE/bioclimatic/',
      content: `Bioclimatic variables derived from Copernicus describing temperature and precipitation annual tendencies, seasonality
        and extreme climatic conditions, including a combination of both environmental factors for current and future scenarios.`
    }
  ];

  const [activeLink, setActiveLink] = useState(null);

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
              <button
                onClick={() => {
                  if (!activeLink || activeLink !== l.key) {
                    setActiveLink(l.key);
                  } else setActiveLink(null);
                }}
              >
                {l.name}
              </button>
              {activeLink === l.key && <p className="menu-link-content">{l.content}</p>}
            </div>
          ))}
        </div>
        <div className="partners">
          <p>In partnership with:</p>
          <p className="partner-logo">
            <a
              href="https://www.copernicus.eu/en"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <img src="/logos/copernicus.png" alt="Copernicus" />
            </a>
          </p>
          <p className="partner-logo">
            <a href="https://www.ecmwf.int" target="_blank" rel="noopener noreferrer nofollow">
              <img src="/logos/ECMWF.png" alt="ECMWF" />
            </a>
          </p>
          <p className="partner-logo">
            <a href="https://ec.europa.eu" target="_blank" rel="noopener noreferrer nofollow">
              <img src="/logos/EC.png" alt="European Comission" />
            </a>
          </p>
        </div>
        <div className="partners">
          <p>Powered by:</p>
          <p className="partner-logo">
            <a href="https://graphcms.com" target="_blank" rel="noopener noreferrer nofollow">
              <img src="/logos/graphcms.svg" alt="Powered by graphCMS" />
            </a>
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
