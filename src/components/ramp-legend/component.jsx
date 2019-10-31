import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import styles from './styles.module.scss';

const RampLegend = ({
  title,
  lowEndValue,
  middleValue,
  highEndValue,
  lowEndName,
  middleName,
  highEndName,
  transparentRamp,
  colorRamp = [],
  activeSpecies
  // handleOpacity
}) => {
  const [legendOpen, toggleLegend] = useState(true);

  return (
    <>
      {legendOpen && (
        <div className={styles.legendContainer}>
          {activeSpecies && (
            <div className={styles.speciesName}>
              Species:
              <span className={styles.italic}>&nbsp;{activeSpecies.name}</span>
            </div>
          )}
          <div className={styles.layerTitle}>{title}</div>
          <div className={cx(styles.ramp, { [styles.transparent]: transparentRamp })}>
            <div
              className={styles.colors}
              style={{
                background: transparentRamp
                  ? `linear-gradient(to right, rgba(193,191,234,0) 0%, rgba(255,255,255,1) 50%, rgba(${transparentRamp.colorRGBA.join(
                      ', '
                    )}) 100%)`
                  : `linear-gradient(0.25turn, ${colorRamp.join(', ')})`
              }}
            >
              <span className={styles.lowEndValue}>{lowEndValue}</span>
              <span className={styles.middleValue}>{middleValue}</span>
              <span className={styles.highEndValue}>{highEndValue}</span>
              <span className={styles.lowEndName}>{lowEndName}</span>
              <span className={styles.middleName}>{middleName}</span>
              <span className={styles.highEndName}>{highEndName}</span>
            </div>
          </div>
          <div className={styles.icons}>
            <button className={styles.button}>
              <Icon name="icon-info" />
            </button>
            <button className={styles.button}>
              <Icon name="icon-opacity" />
            </button>
            <button className={styles.button} onClick={() => toggleLegend(false)}>
              <Icon className={styles.collapseIcon} name="icon-arrow-left" />
            </button>
          </div>
        </div>
      )}
      {!legendOpen && (
        <div className={styles.closedLegend}>
          <button onClick={() => toggleLegend(true)}>
            <Icon className={styles.expandIcon} name="icon-arrow-left" />
          </button>
        </div>
      )}
    </>
  );
};

RampLegend.propTypes = {
  title: PropTypes.string, // title of the layer
  lowEndValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying on top-left corner of the legend
  middleValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying in the middle - top of the legend
  highEndValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying on top-right corner of the legend
  lowEndName: PropTypes.string, // text displaying on bottom-left corner of the legend
  middleName: PropTypes.string, // text displaying in the middle - bottom
  highEndName: PropTypes.string, // text displaying on bottom-right corner of the legend
  transparentRamp: PropTypes.shape({
    colorRGBA: PropTypes.array.isRequired // deepest color of the ramp in RGBA
  }), // if passed, ramp background would be set to have a transparent background-image (see alpha.png image in assets)
  // colorRamp: PropTypes.array, // ramp of colours in HEX (needs to be passed if transparentRamp is not passed)
  // eslint-disable-next-line consistent-return
  colorRamp: props => {
    if (!props.transparentRamp) {
      return new Error('Please provide a ramp of colours array in HEX!');
    }
  },
  activeSpecies: PropTypes.oneOfType(PropTypes.object, PropTypes.string)
};

export default RampLegend;

/* Ramp Display
 *
 *   lowEndValue          highEndValue
 *
 *   |_______________________________|  ----- ramp
 *
 *   lowEndName            highEndName
 */
