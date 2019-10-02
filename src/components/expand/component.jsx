import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Expand({ content }) {
  const [isExpanded, expand] = useState(false);

  return (
    <div className="c-expand">
      <button className="button toggle" onClick={() => expand(!isExpanded)}>
        Choose country
      </button>
      <div className={`blender ${isExpanded ? 'expand' : ''}`} />
      <div className={`expand-content ${isExpanded ? '-visible' : ''}`}>{content}</div>
    </div>
  );
}

Expand.propTypes = {
  content: PropTypes.object
};

export default Expand;
