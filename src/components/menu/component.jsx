import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';

import './styles.scss';

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
      name: 'Home',
      path: '/'
    },
    {
      name: 'Species distribution',
      path: '/SWE/species/1234'
    },
    {
      name: 'Bioclimatic variables',
      path: '/SWE/bioclimatic/1234'
    }
  ];

  return (
    <div className={`c-menu ${active ? 'open' : ''}`} ref={wrapperRef}>
      <button onClick={closeMenu} className="close-button">
        <Icon name="icon-close" className="close-icon" />
        Close
      </button>
      {links.map(l => (
        <div className="menu-link" key={l.name}>
          <Link to={l.path} onClick={closeMenu}>
            {l.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

Menu.propTypes = {
  active: PropTypes.bool,
  closeMenu: PropTypes.func
};

export default Menu;
