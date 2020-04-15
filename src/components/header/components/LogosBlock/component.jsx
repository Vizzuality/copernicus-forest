import React from 'react';
import ImageLogoEC from 'assets/img/logo-ec.png';
import ImageLogoCopernicus from 'assets/img/logo-copernicus.png';
import ImageLogoEcmwf from 'assets/img/logo-ecmwf.png';
import './styles.scss';

const logos = [
  {
    key: 'ec',
    image: ImageLogoEC,
    title: 'European Commission',
    href: 'http://ec.europa.eu/'
  },
  {
    key: 'copernicus',
    image: ImageLogoCopernicus,
    title: 'Copernicus',
    href: 'http://www.copernicus.eu/'
  },
  {
    key: 'ecmwf',
    image: ImageLogoEcmwf,
    title: 'ECMWF',
    href: 'https://www.ecmwf.int/'
  }
];

const LogosBlock = ({ onClose = () => {}, barRef = {}, outerHeight = 0 }) => {
  const onCloseBar = e => {
    e.preventDefault();
    onClose(e);
  };

  return (
    <div ref={barRef} className="c-logos-block-section" style={{ height: outerHeight }}>
      <div className="bar">
        <div className="bar__inner ">
          <div className="logos-block">
            {logos.map(logo => (
              <a key={logo.key} href={logo.href}>
                <img
                  className={`logo ${logo.key}`}
                  src={logo.image}
                  title={logo.title}
                  alt={logo.title}
                />
              </a>
            ))}
            <a
              href="/"
              onClick={e => onCloseBar(e)}
              className="button toggle button--light close-toggle-permanently"
            >
              <svg className="social-link-icon-img">
                <use xlinkHref="#icon-cross" />
              </svg>
              close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogosBlock;
