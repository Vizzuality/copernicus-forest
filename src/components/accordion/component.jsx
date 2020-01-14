import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import MiniChart from 'components/minichart';
import Chart from 'components/chart';
import styles from './styles.scss';

function useScrollToActiveItem(scrollKey) {
  const list = useRef(null);
  const hasBeenSet = useRef(null);
  useEffect(() => {
    hasBeenSet.current = false;
  }, [scrollKey]);

  useEffect(() => {
    const item = list.current.querySelector('.js--active');
    if (list.current && !hasBeenSet.current && item) {
      hasBeenSet.current = true;
      const rect = item.getBoundingClientRect();
      list.current.scrollTop += rect.y + rect.height / 2 - window.innerHeight / 2;
    }
  });

  return list;
}
function Accordion(props) {
  const { items, setItem, activeItemId, scrollKey } = props;
  const listRef = useScrollToActiveItem(scrollKey);
  const [hoveredItem, setHover] = useState(null);

  return (
    <div className="c-accordion">
      <ul className="accordion-list" ref={listRef}>
        {items.map(item => {
          const isActive = item.id === activeItemId;
          const isHover = item === hoveredItem;
          const area = {
            ...item.config.areas[0],
            color: isHover ? styles.colorPink : styles.colorBlack,
            fillOpacity: 1,
            isAnimationActive: false
          };
          return (
            <li
              key={item.key || item.title}
              className={cx('accordion-item', { __open: isActive, 'js--active': isActive })}
            >
              <button
                disabled={isActive}
                onClick={() => setItem(item)}
                onMouseEnter={() => setHover(item)}
                onMouseLeave={() => setHover(null)}
                className="accordion-title"
              >
                <p>{item.title}</p>
                {!isActive && (
                  <MiniChart
                    className="accordion-minichart"
                    data={item.data}
                    config={{
                      area,
                      height: 25,
                      yAxis: {
                        domain: item.config.yAxis.domain,
                        ticks: item.config.yAxis.ticks,
                        customTick: true
                      }
                    }}
                  />
                )}
                <Icon name="icon-expand" className={cx('expand-icon', { __open: isActive })} />
              </button>
              {isActive && (
                <div className="accordion-content">
                  <Chart
                    className="accordion-chart"
                    data={item.data}
                    config={item.config}
                    metadata={item.metadata}
                  />
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
  items: PropTypes.array,
  setItem: PropTypes.func,
  scrollKey: PropTypes.string,
  activeItemId: PropTypes.string
};

export default Accordion;
