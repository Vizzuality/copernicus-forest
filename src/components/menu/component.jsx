import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

function useOutsideAlerter(ref, closeMenu) {
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

function Menu({ closeMenu }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeMenu);

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
    <div className="c-menu" ref={wrapperRef}>
      <button onClick={closeMenu}>
        <CloseIcon className="icon close-icon" />
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
  closeMenu: PropTypes.func
};

export default Menu;
