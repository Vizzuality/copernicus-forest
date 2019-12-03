import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';

import Component from './component';

const OpacityModal = () => {
  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();
  const { opacity } = currentQueryParams;

  const layerOpacity = opacity && Number(opacity) ? Number(opacity) : 60;

  const handleChangeOpacity = value => {
    setQueryParams({ ...currentQueryParams, opacity: value }, location, history);
  };

  return <Component handleChangeOpacity={handleChangeOpacity} layerOpacity={layerOpacity} />;
};

export default OpacityModal;
