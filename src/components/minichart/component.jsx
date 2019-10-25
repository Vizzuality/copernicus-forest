/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import cx from 'classnames';
import './styles.scss';

function MiniChart({ className, data, config }) {
  const { height, area } = config;
  return (
    <div className={cx('c-minichart', className)}>
      <ResponsiveContainer width="100%" height={height || 50}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Area
            type="monotone"
            key={area.key}
            dataKey={area.key}
            stroke={area.color}
            fill={area.color}
            {...area}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

MiniChart.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default MiniChart;
