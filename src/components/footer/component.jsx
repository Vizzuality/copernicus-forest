/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Created using data from the{' '}
      <a href="https://climate.copernicus.eu/thermal-assessment-tool">
        Copernicus Climate Change Service
      </a>
    </footer>
  );
};

export default Footer;
