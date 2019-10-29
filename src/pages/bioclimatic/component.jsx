import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

function BioClimaticPage(props) {
  const { config, filters } = props;
  const { startYear, endYear, scenario, parsedScenarios } = filters;
  const parsedScenario = parsedScenarios && parsedScenarios.find(s => s.value === scenario).label;

  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));
  const { fetching, data, error } = useBiovars();

  // TODO: change to graphQL query based on scenario, biovar (item), and country
  const mockData = [
    { name: '2020', [scenario]: 3 },
    { name: '2030', [scenario]: 3.5 },
    { name: '2040', [scenario]: 6 },
    { name: '2050', [scenario]: 6.2 },
    { name: '2060', [scenario]: 11 },
    { name: '2070', [scenario]: 9 },
    { name: '2080', [scenario]: 13 },
    { name: '2090', [scenario]: 18 }
  ];

  const filterData = dataPoints =>
    dataPoints.filter(
      d => Number(d.name) >= Number(startYear) && Number(d.name) <= Number(endYear)
    );

  return (
    <div className="c-bioclimatic l-page">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Filters {...filters} />
      <div className="content">
        {fetching && <p>Loading...</p>}
        {error && <p>Error retrieving the data</p>}
        {!fetching && !error && (
          <div className="bioclimatic-chart">
            <Accordion
              items={sortBy(data.biovars, 'key').map((bv, i) => ({
                title: `BIO ${i + 1} = ${bv.name}`,
                key: bv.key,
                data: filterData(mockData),
                config,
                metadata: {
                  dataset: bv.name.replace(/ *\([^)]*\) */g, ''),
                  model: parsedScenario,
                  unit: '°C' // TODO: change
                }
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

BioClimaticPage.propTypes = {
  config: PropTypes.object,
  filters: PropTypes.object
};

export default BioClimaticPage;
