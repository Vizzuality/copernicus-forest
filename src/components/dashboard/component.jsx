import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import cx from 'classnames';
import styles from './styles.scss';

function Dashboard({ data, className }) {
  return (
    <div className={cx('c-dashboard', className)}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke={styles && styles.colorMustard}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke={styles && styles.colorViolet} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

Dashboard.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string
};

export default Dashboard;
