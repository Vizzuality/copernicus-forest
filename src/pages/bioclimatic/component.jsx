import React, { useState } from 'react';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

import Map from 'components/map';
import Dashboard from 'components/dashboard';
import LayerToggle from 'components/map/controls/layer-toggle';

import layers from 'layers.json';
import './styles.scss';

function BioClimaticPage() {
  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));
  return (
    <div className="c-bioclimatic">
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

export default BioClimaticPage;
