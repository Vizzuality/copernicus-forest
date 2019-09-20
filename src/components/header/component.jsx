import React, { useState } from 'react';
import './styles.scss';
import Menu from 'components/menu';
import Icon from 'components/icon';

function Header() {
  const [menuOpen, showMenu] = useState(false);

  return (
    <div className="c-header">
      <button className="menu-button" onClick={() => showMenu(!menuOpen)}>
        <Icon name="icon-menu" className="menu-icon" />
        Menu
      </button>
      {/* logo placeholder */}
      <span>GLOBAL FOREST CLIMATE SERVICES</span>
      <Menu closeMenu={() => showMenu(false)} active={menuOpen} />
    </div>
  );
}

export default Header;
