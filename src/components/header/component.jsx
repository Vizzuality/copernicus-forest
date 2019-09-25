import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function Header() {
  return (
    <div className="c-header">
      {/* logo placeholder */}
      <Link to="/">
        <span>GLOBAL FOREST CLIMATE SERVICES</span>
      </Link>
    </div>
  );
}

export default Header;
