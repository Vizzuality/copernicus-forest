import React from 'react';
import Icon from 'components/icon';
import Switch from 'components/switch';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LayersToggleModalComponent = ({ handleCloseModal, checked, setChecked }) => {
  return (
    <div className={styles.toggleLayerModal}>
      <div className={styles.header}>
        <span className={styles.title}>ADD LAYERS TO THE MAP</span>
        <button onClick={handleCloseModal}>
          <Icon name="icon-close" />
        </button>
      </div>
      <div className={styles.content}>
        <Switch
          value="layer-1"
          checked={checked}
          handleChange={() => setChecked(!checked)}
          name="Land use"
        />
        <Switch
          value="layer-2"
          checked={checked}
          handleChange={() => setChecked(!checked)}
          name="Plantations"
        />
        <div className={styles.spacer} />
        <Switch
          value="layer-3"
          checked={checked}
          handleChange={() => setChecked(!checked)}
          name="Labels"
        />
        <Switch
          value="layer-4"
          checked={checked}
          handleChange={() => setChecked(!checked)}
          name="Admin"
        />
      </div>
    </div>
  );
};

LayersToggleModalComponent.propTypes = {
  checked: PropTypes.bool,
  setChecked: PropTypes.func,
  handleCloseModal: PropTypes.func
};

export default LayersToggleModalComponent;
