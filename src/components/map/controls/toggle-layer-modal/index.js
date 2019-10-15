import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import Component from './component';

const ToggleLayerModal = ({ tooltipRef }) => {
  const [checked, setChecked] = useState(false);

  const handleCloseModal = () => {
    const { current } = tooltipRef;
    if (current) current.tooltipRef = null; // force hiding the tooltip, more about this workaround here: https://github.com/wwayne/react-tooltip/issues/449#issuecomment-514768776
    ReactTooltip.hide();
  };

  return (
    <Component checked={checked} setChecked={setChecked} handleCloseModal={handleCloseModal} />
  );
};

ToggleLayerModal.propTypes = {
  tooltipRef: PropTypes.object
};

export default ToggleLayerModal;
