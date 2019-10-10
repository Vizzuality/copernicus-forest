import React, { useState } from 'react';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

import Map from 'components/map';
import Chart from 'components/chart';
import LayerToggle from 'components/map/controls/layer-toggle';

import layers from 'layers.json';
import './styles.scss';

function BioClimaticPage() {
  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  const config = {
    lines: [
      {
        key: 'uv'
      },
      {
        key: 'pv'
      }
    ]
  };

  return (
    <div className="c-bioclimatic">
      <div className="content">
        <Chart data={data} config={config} className="bioclimatic-chart" />
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
