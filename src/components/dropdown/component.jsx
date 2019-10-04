import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import cx from 'classnames';
import './styles.scss';

function useClickOutside(ref, closeDropdown) {
  function handleClickOutside(event) {
    if (closeDropdown && ref.current && !ref.current.contains(event.target)) {
      closeDropdown();
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

function SpeciesList({ title, list }) {
  const [opened, open] = useState(false);
  const wrapperRef = useRef(null);
  const closeDropdown = () => open(false);
  useClickOutside(wrapperRef, closeDropdown);

  return (
    <div className="c-dropdown" ref={wrapperRef}>
      <button className="dd-header" onClick={() => open(!opened)}>
        <div className="dd-header-title">{title}</div>
        {/* ARROW ICON
        opened
          ? <FontAwesome name="angle-up" size="2x"/>
        : <FontAwesome name="angle-down" size="2x"/>
        */}
      </button>
      {opened && (
        <ul className="dd-list">
          {list.map(country => (
            <li className="dd-list-item" key={country.value}>
              <Link to={`/${country.value}/species/1`}>{country.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SpeciesList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
};

export default SpeciesList;
