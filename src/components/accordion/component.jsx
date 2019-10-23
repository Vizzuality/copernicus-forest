import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

function Accordion({ items }) {
  const [activeItem, setItem] = useState(null);
  const isActive = item => item === activeItem;

  return (
    <div className="c-accordion">
      <ul>
        {items.map(item => (
          <li
            key={item.key || item.title}
            className={cx('accordion-item', { __open: isActive(item) })}
          >
            <button
              onClick={() => (isActive(item) ? setItem(null) : setItem(item))}
              className="accordion-title"
            >
              {item.title}
            </button>
            {isActive(item) && <div className="accordion-content">{item.content}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.array
};

export default Accordion;
