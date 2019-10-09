import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from 'components/icon';
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

function Dropdown({ title, options, className }) {
  const [opened, open] = useState(false);
  const wrapperRef = useRef(null);
  const closeDropdown = () => open(false);
  useClickOutside(wrapperRef, closeDropdown);

  return (
    <div className={cx('c-dropdown', className)} ref={wrapperRef}>
      <button className="dd-header" onClick={() => open(!opened)}>
        <div className="dd-header-title">{title}</div>
        {/* ARROW ICON
        opened
          ? <FontAwesome name="angle-up" size="2x"/>
        : <FontAwesome name="angle-down" size="2x"/>
        */}
        <Icon name="icon-dropdown" className={cx('dropdown-icon', { __open: opened })} />
      </button>
      {opened && (
        <ul className="dd-list">
          {options.map(opt => (
            <li className="dd-list-item" key={opt.value}>
              {opt.link ? <Link to={opt.link}>{opt.label}</Link> : <p>{opt.label}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string
};

export default Dropdown;
