import React from 'react';
import Component from './component';

const OpacityModal = () => {
  const handleChangeOpacity = value => {
    return value;
  };

  return <Component handleChangeOpacity={handleChangeOpacity} />;
};

export default OpacityModal;
