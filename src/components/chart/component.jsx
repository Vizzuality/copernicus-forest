/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
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

CustomDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  stroke: PropTypes.string
};

const CustomTooltip = props => {
  const { payload, label, metadata } = props;
  const { dataset, unit } = metadata || // example metadata, delete
  { dataset: 'Annual Mean Temperature', model: 'RCP 8.5', unit: '°C' };
  // console.log(props);
  return (
    <div className="custom-tooltip">
      <p className="label">{`${dataset} in ${label}`}</p>
      {payload
        // removing duplicates, e.g. line and area in biovars page
        .filter((key, index, self) => self.findIndex(_key => _key.name === key.name) === index)
        .map(
          p =>
            console.log(p) || (
              <p className="desc" key={p.name}>
                <svg height="6" width="6">
                  <circle cx="3" cy="3" r="3" strokeWidth="0" fill={p.stroke || p.fill} />
                </svg>
                <span className="value">{`${p.name}: ${p.value}${p.unit || unit}`}</span>
              </p>
            )
        )}
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  label: PropTypes.string,
  metadata: PropTypes.object
};

function Chart({ className, data, config, metadata }) {
  const { lines, areas, yAxis, xAxis, grid, showLegend } = config;
  return (
    <div className={cx('c-chart', className)}>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid {...grid} />
          <XAxis dataKey="name" {...xAxis} />
          <YAxis type="number" {...yAxis} />
          <Tooltip
            // TODO: make it actually work
            isAnimationActive
            animationBegin={2000}
            content={<CustomTooltip metadata={metadata} />}
          />
          {showLegend && <Legend align="right" layout="vertical" verticalAlign="top" />}
          {areas &&
            areas.map(area => (
              <Area
                type="monotone"
                key={area.key}
                dataKey={area.key}
                stroke={area.color}
                fill={area.color}
              />
            ))}
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
        </ComposedChart>
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
