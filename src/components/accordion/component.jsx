import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import MiniChart from 'components/minichart';
import Chart from 'components/chart';
import './styles.scss';

function Accordion({ items }) {
  const [activeItem, setItem] = useState(items.length && items[0]);

  return (
    <div className="c-accordion">
      <ul>
        {items.map(item => {
          const isActive = item === activeItem;
          const area = {
            ...item.config.areas[0],
            color: '#000',
            fillOpacity: 1,
            isAnimationActive: false
          };
          return (
            <li key={item.key || item.title} className={cx('accordion-item', { __open: isActive })}>
              <button
                onClick={() => (isActive ? setItem(null) : setItem(item))}
                className="accordion-title"
              >
                <p>{item.title}</p>
                {!isActive && (
                  <MiniChart
                    className="accordion-minichart"
                    data={item.data}
                    config={{ area, height: 25 }}
                  />
                )}
                <Icon name="icon-expand" className={cx('expand-icon', { __open: isActive })} />
              </button>
              {isActive && (
                <div className="accordion-content">
                  <Chart data={item.data} config={item.config} />
                </div>
              )}
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
