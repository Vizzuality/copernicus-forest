import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Icon from 'components/icon';
import Modal from 'components/modal';
import styles from './styles.module.scss';

const InfoComponent = ({ className, infoKey }) => {
  const infoValues = {
    'RCP 4.5': `Representative Concentration Pathways (RCPs) are pathways. They constitute projections of greenhouse gas emissions and
			concentrations. The values refer to radiative forcing in Watt/m2 by the end of the century compared to preindustrial times, e.g.
			4.5 Watt/m2 in the case of RCP 4.5. RCP 4.5 describes a scenario of Slowly Declining Emissions and it would lead to an increase
			of temperature of around 2.4 °C`,
    'RCP 8.5': `Representative Concentration Pathways (RCPs) are pathways. They constitute projections of greenhouse gas emissions and
			concentrations. The values refer to radiative forcing in Watt/m2 by the end of the century compared to preindustrial times, e.g.
			8.5 Watt/m2 in the case of RCP 8.5. RCP 8.5 describes a scenario of Rising Emissions and it would lead to an increase of temperature
			of around 4.3 °C `
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <button
      className={cx(styles.info, className)}
      // data-tip
      // data-for={`info-tooltip-${infoKey.replace(/\s+/g, '')}`}
      onClick={() => setModalOpen(true)}
    >
      <Icon name="icon-info" />
      {/* <ReactTooltip type="dark" effect="float" id={`info-tooltip-${infoKey.replace(/\s+/g, '')}`}>
        <p className={styles.tooltip}>{infoValues[infoKey]}</p>
      </ReactTooltip> */}
      <Modal
        title={infoKey}
        text={infoValues[infoKey]}
        isOpen={isModalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </button>
  );
};

InfoComponent.propTypes = {
  className: PropTypes.string,
  infoKey: PropTypes.string
};

export default InfoComponent;
