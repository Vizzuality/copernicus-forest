import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

function Icon({ className = null, name, onClick }) {
  const componentClass = cx('c-icon', { [className]: !!className });

  return (
    <svg className={componentClass} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;
