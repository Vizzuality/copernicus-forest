import React, { useState } from 'react';
import { LayerManager, Layer } from 'layer-manager/dist/components';
// eslint-disable-next-line import/no-unresolved
import { PluginMapboxGl } from 'layer-manager';

import Map from './components/map';
import Dashboard from './components/dashboard';
import LayerToggle from './components/map/controls/layer-toggle';
import Header from './components/header';

import layers from './layers.json';

import './App.scss';

function App() {
  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));

  return (
    <div className="c-app">
      <Header />
      <div className="c-header">navbar goes here</div>
      <div className="content">
        <Dashboard />
        <Map
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
          viewport={{ zoom: 4, latitude: 40, longitude: -5 }}
        >
          {map => (
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {activeLayers
                .filter(l => l.active)
                .map(layer => (
                  // TODO: fix all eslint-disables
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Layer key={layer.id} {...layer} />
                ))}
            </LayerManager>
          )}
        </Map>
        <LayerToggle layers={activeLayers} setLayers={setActiveLayers} />
      </div>
    </div>
  );
}

export default App;
