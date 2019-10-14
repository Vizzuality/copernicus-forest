/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import cx from 'classnames';
import './styles.scss';

function CustomDot(props) {
  const { cx: x, cy: y, stroke } = props;
  return (
    <svg x={x - 10} y={y - 10} width={20} height={20} fill={stroke} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="3" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

function Chart({ className, data, config }) {
  const { lines, areas, yAxis, xAxis, grid, showLegend } = config;
  return (
    <div className={cx('c-dashboard', className)}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" {...grid} />
          <XAxis dataKey="name" {...xAxis} />
          <YAxis type="number" {...yAxis} />
          <Tooltip
            // TODO: make it actually work
            isAnimationActive
            animationBegin={2000}
          />
          {showLegend && <Legend align="right" layout="vertical" verticalAlign="middle" />}
          {lines &&
            lines.map(line => (
              <Line
                type="monotone"
                key={line.key}
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={3}
                dot={CustomDot}
              />
            ))}
          {areas &&
            areas.map(area => (
              <Area
                type="monotone"
                key={area.key}
                dataKey={area.key}
                stroke={area.color}
                fillOpacity={1}
                fill={area.color}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Chart;
