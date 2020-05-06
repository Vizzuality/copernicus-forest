import React from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from 'components/icon';
import { COUNTRIES } from 'constants.js';
import styles from './styles.module.scss';

const SubHeader = () => {
  const match = useRouteMatch('/:iso/:type/:id?');
  const { iso, type, id } = (match && match.params) || {};
  const { pathname } = useLocation();

  const urls = {
    species: type === 'species' ? '#' : `/${iso}/species/${id}`,
    distribution: type === 'distribution' ? '#' : `/${iso}/distribution/${id}`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${iso}/bioclimatic/${id}`
  };

  const speciesTabsData = [
    {
      name: 'Species summary',
      path: urls.species,
      active: pathname.includes('/species'),
      page: 'species'
    },
    {
      name: 'Map distribution',
      path: urls.distribution,
      active: pathname.includes('/distribution'),
      page: 'distribution'
    }
  ];

  const subMenu = [
    {
      name: iso ? COUNTRIES.find(c => c.iso === iso).name : 'Country',
      sections: COUNTRIES.map(c => {
        c.path = `/${c.iso}/${type}/${id}`;
        c.active = pathname.includes(`/${c.iso}`);
        return c;
      })
    },
    {
      name: 'Species distribution',
      active: pathname.includes('/species') || pathname.includes('/distribution'),
      sections: speciesTabsData
    },
    {
      name: 'Bioclimatic variables',
      active: pathname.includes('/bioclimatic'),
      path: urls.bioclimatic
    }
  ];

  return (
    <div className={styles.cSubheader}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/logos/logo.svg" alt="logo" />
        </Link>
        <ul className={styles.subMenu}>
          {subMenu.map((s, key) => (
            <li key={key} className={cx(styles.menuItem, { [styles.active]: s.active })}>
              {s.path ? <Link to={s.path}>{s.name}</Link> : <>{s.name}</>}
              {s.sections && s.sections.length > 0 && (
                <>
                  <Icon name="icon-triangle" />
                  <ul>
                    {s.sections.map((sec, sKey) => (
                      <li key={sKey} className={sec.active ? styles.active : ''}>
                        <Link to={sec.path}>{sec.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubHeader;
