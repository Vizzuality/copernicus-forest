import React, { useState } from 'react';
import './styles.scss';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import Menu from 'components/menu';

function Header() {
  const [menuOpen, showMenu] = useState(false);

  return (
    <div className="c-header">
      <MenuIcon className="icon menu-icon" onClick={() => showMenu(!menuOpen)} />
      <span>GLOBAL FOREST CLIMATE SERVICES</span>
      {menuOpen && <Menu closeMenu={() => showMenu(false)} />}
    </div>
  );
}

export default Header;
