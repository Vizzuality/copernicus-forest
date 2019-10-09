import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import './styles.scss';

function Expand({ content, label }) {
  const [isExpanded, expand] = useState(false);

  return (
    <div className="c-expand">
      <button className="button toggle" onClick={() => expand(!isExpanded)}>
        <Icon name={isExpanded ? 'icon-close' : 'icon-menu'} className="toggle-icon" />
        {label}
      </button>
      <div className={`blender ${isExpanded ? 'expand' : ''}`} />
      <div className={`expand-content ${isExpanded ? '-visible' : ''}`}>{content}</div>
    </div>
  );
}

Expand.propTypes = {
  content: PropTypes.object,
  label: PropTypes.string
};

export default Expand;
