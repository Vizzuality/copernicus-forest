import React, { useState } from 'react';
import './styles.scss';
// import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import Icon from 'vizzuality-components/dist/icon';
import menuIcon from 'assets/icons/menu.svg';
import Menu from 'components/menu';

function Header() {
  const [menuOpen, showMenu] = useState(false);

  return (
    <div className="c-header">
      <Icon name="icon-search" onClick={() => showMenu(!menuOpen)} icon={menuIcon} />
      {/* <MenuIcon /> */}
      <span>GLOBAL FOREST CLIMATE SERVICES</span>
      {menuOpen && <Menu closeMenu={() => showMenu(false)} />}
    </div>
  );
}

export default Header;
