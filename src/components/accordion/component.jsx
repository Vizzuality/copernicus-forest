import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Accordion({ items }) {
  const [activeItem, setItem] = useState(null);
  return (
    <div className="c-accordion">
      <ul>
        {items.map(item => (
          <li key={item.title} className="accordion-item">
            <button
              onClick={() => (activeItem === item ? setItem(null) : setItem(item))}
              className="accordion-title"
            >
              {item.title}
            </button>
            {activeItem === item && <div className="accordion-content">{item.content}</div>}
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
