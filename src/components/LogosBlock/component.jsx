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

const LogosBlock = ({ position = 'header', onClose = () => {}, barRef = {}, outerHeight = 0 }) => {
  const onCloseBar = e => {
    e.preventDefault();
    onClose(e);
  };

  const isFooter = position === 'footer';
  const mainClass = ['c-logos-block-section'];
  if (isFooter) {
    mainClass.push('isFooter');
  }

  return (
    <div
      ref={barRef}
      className={mainClass.join(' ')}
      style={{ height: isFooter ? 'auto' : outerHeight }}
    >
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
            {!isFooter && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogosBlock;
