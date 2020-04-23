import React from 'react';
import Icon from 'components/icon';
import cx from 'classnames';

import { Link } from 'react-router-dom';

import './styles.scss';


const subMenu = [
  {
    title: 'Sweeden',
    sections: [
      {
        title: 'Canada'
      },
      {
        title: 'Indonesia'
      },
      {
        title: 'Sweeden'
      },
      {
        title: 'Peru'
      },
      {
        title: 'Tanzania'
      }
    ]
  },
  {
    title: 'Species distribution',
    sections: [
      {
        title: 'Map distribution'
      },
      {
        title: 'Species summary'
      }
    ]
  },
  {
    title: 'Bioclimatic variables'
  }
];

const SubHeader = () => {
  return (
    <>
      <div className="c-subheader">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/logos/logo.svg" alt="logo" />
          </Link>
          <ul className="sub-menu">
            {subMenu.map(s => (
              <li>
                {s.title}
                {s.sections && s.sections.length > 0 && (
                  <>
                    <Icon name="icon-triangle" />
                    <ul>
                      {s.sections.map(sec => (
                        <li>{sec.title}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
