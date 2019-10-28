import React, { useState } from 'react';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import sortBy from 'lodash/sortBy';

import Modal from 'components/modal';
import Map from 'components/map';
import Accordion from 'components/accordion';
import Filters from 'components/filters';
import LayerToggle from 'components/map/controls/layer-toggle';
import { useBiovars } from 'graphql/queries';

import layers from 'layers.json';
import styles from './styles.scss';

function BioClimaticPage() {
  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));

  const { fetching, data, error } = useBiovars();

  const mockData = [
    { name: '2020', 'Business as usual': 3 },
    { name: '2030', 'Business as usual': 3.5 },
    { name: '2040', 'Business as usual': 6 },
    { name: '2050', 'Business as usual': 6.2 },
    { name: '2060', 'Business as usual': 11 },
    { name: '2070', 'Business as usual': 9 },
    { name: '2080', 'Business as usual': 13 },
    { name: '2090', 'Business as usual': 18 }
  ];

  const config = {
    lines: [
      {
        key: 'Business as usual',
        color: styles.colorPink
      }
    ],
    areas: [
      {
        key: 'Business as usual',
        color: styles.colorPink
      }
    ],
    yAxis: {
      domain: [0, 20],
      unit: '°C',
      ticks: [0, 5, 10, 15, 20],
      customTick: true,
      axisLine: false
    },
    xAxis: {
      padding: { left: -30, right: -30 }
    },
    grid: {
      vertical: false
    },
    height: 300
  };

  return (
    <div className="c-bioclimatic l-page">
      <Filters />
      <div className="content">
        {fetching && <p>Loading...</p>}
        {error && <p>Error retrieving the data</p>}
        {!fetching && !error && (
          <div className="bioclimatic-chart">
            <Accordion
              items={sortBy(data.biovars, 'key').map((bv, i) => ({
                title: `BIO ${i + 1} = ${bv.name}`,
                key: bv.key,
                data: mockData,
                config
              }))}
            />
          </div>
        )}
        <div className="map-wrapper">
          <Map
            mapboxApiAccessToken={process.env.react_app_mapbox_token}
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
          <Modal
            title="Bioclimatic variables data"
            text={`Bioclimatic variables derived from Copernicus describing temperature and precipitation annual tendencies, seasonality
                  and extreme climatic conditions, including a combination of both environmental factors for current and future scenarios.`}
            storageKey="bioclimatic"
          />
        </div>
      </div>
    </div>
  );
}

export default BioClimaticPage;
