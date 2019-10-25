import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import './styles.scss';

function Accordion({ items }) {
  const [activeItem, setItem] = useState(items.length && items[0]);

  return (
    <div className="c-accordion">
      <ul>
        {items.map(item => {
          const isActive = item === activeItem;
          return (
            <li key={item.key || item.title} className={cx('accordion-item', { __open: isActive })}>
              <button
                onClick={() => (isActive ? setItem(null) : setItem(item))}
                className="accordion-title"
              >
                {item.title}
                <Icon name="icon-expand" className={cx('expand-icon', { __open: isActive })} />
              </button>
              {isActive && <div className="accordion-content">{item.content}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.array
};

export default Accordion;
