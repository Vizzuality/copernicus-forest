import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import Modal from 'components/modal';
import Map from 'components/map';
import Accordion from 'components/accordion';
import Filters from 'components/filters';
import LayerToggle from 'components/map/controls/layer-toggle';
import Timeline from 'components/map/controls/timeline';

import layers from 'layers.json';

function BioClimaticPage(props) {
  const { getConfig, filters, data, timelineData } = props;
  const { scenario, parsedScenarios } = filters;

  const parsedScenario = parsedScenarios && parsedScenarios.find(s => s.value === scenario);
  const biovarsData = groupBy(data.countryBiovarDistributions, 'biovar.key');
  const [activeLayers, setActiveLayers] = useState(layers.map(l => ({ ...l, active: true })));
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });

  return (
    <div className="c-bioclimatic l-page">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Filters {...filters} />
      <div className="content">
        <div className="bioclimatic-chart">
          <Accordion
            items={sortBy(data.biovars, 'key').map((bv, i) => ({
              title: `BIO ${i + 1} = ${bv.name}`,
              key: bv.key,
              data: sortBy(biovarsData[bv.key], 'name').map(d =>
                d.name === 1995 ? { ...d, name: 'current' } : d
              ),
              config: getConfig(bv.unit),
              metadata: {
                dataset: bv.name.replace(/ *\([^)]*\) */g, ''), // no "formulae" like (a-b)
                model: parsedScenario.name,
                unit: bv.unit
              }
            }))}
          />
        </div>
        <div className="map-wrapper">
          <Map
            mapboxApiAccessToken={process.env.react_app_mapbox_token}
            mapStyle="mapbox://styles/fannycc/ck06rjkc5049k1co3b5fjj6li"
            viewport={viewport}
            setViewport={setViewport}
          >
            {map => (
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {activeLayers
                  .filter(l => l.active)
                  .map(layer => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Layer key={layer.id} {...layer} />
                  ))}
              </LayerManager>
            )}
          </Map>
          <Timeline className="timeline" activeTab={scenario} data={timelineData} hideHeader />
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
  data: PropTypes.object,
  getConfig: PropTypes.func,
  filters: PropTypes.object,
  timelineData: PropTypes.object
};

export default BioClimaticPage;
