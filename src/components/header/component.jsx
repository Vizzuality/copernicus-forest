import React, { useState } from 'react';
import './styles.scss';
import Menu from 'components/menu';
import Icon from 'components/icon';

function Header() {
  const [menuOpen, showMenu] = useState(false);

  return (
    <div className="c-header">
      <button onClick={() => showMenu(!menuOpen)}>
        <Icon name="icon-menu" />
        Menu
      </button>
      <span>GLOBAL FOREST CLIMATE SERVICES</span>
      {menuOpen && <Menu closeMenu={() => showMenu(false)} />}
    </div>
  );
}

export default Header;
