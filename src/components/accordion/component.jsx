import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Accordion({ items }) {
  return (
    <div className="c-accordion">
      <ul>
        {items.map(item => (
          <li key={item.title}>
            <details>
              <summary className="accordion-title">{item.title}</summary>
              <div className="accordion-content">{item.content}</div>
            </details>
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
