import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Menu from 'components/menu';
import Icon from 'components/icon';

function Header() {
  const [menuOpen, showMenu] = useState(false);
  return (
    <div className="c-header">
      {/* logo placeholder */}
      <Link to="/">
        <span>GLOBAL FOREST CLIMATE SERVICES</span>
      </Link>
      <button className="menu-button" onClick={() => showMenu(!menuOpen)}>
        <Icon name="icon-menu" className="menu-icon" />
        About
      </button>
      <Menu closeMenu={() => showMenu(false)} active={menuOpen} />
    </div>
  );
}

export default Header;
