import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import { LayerManager, Layer } from 'layer-manager/dist/components';
// import { PluginMapboxGl } from 'layer-manager';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

import Modal from 'components/modal';
import Map from 'components/map';
import Accordion from 'components/accordion';
import Filters from 'components/filters';
import Timeline from 'components/map/controls/timeline';
import RampLegend from 'components/ramp-legend';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

function BioClimaticPage(props) {
  const { getConfig, filters, data, timelineData, viewport, setViewport, activeLayers } = props;
  const { scenario, parsedScenarios } = filters;

  const parsedScenario = parsedScenarios && parsedScenarios.find(s => s.value === scenario);
  const biovarsList = sortBy(data.biovars, 'key');
  const biovarsData = groupBy(data.countryBiovarDistributions, 'biovar.key');

  const chosenBiovar = useMemo(() => filters.biovar || (biovarsList[0] && biovarsList[0].key), [
    biovarsList,
    filters.biovar
  ]);

  return (
    <div className="c-bioclimatic l-page">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Filters {...filters} />
      <div className="content">
        <div className="bioclimatic-chart">
          <Accordion
            activeItemId={chosenBiovar}
            setItem={item => filters.setBiovar(item.id)}
            items={biovarsList.map((bv, i) => ({
              title: `BIO ${i + 1} = ${bv.name}`,
              id: bv.key,
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
                    // TODO: fix all eslint-disables
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Layer key={layer.id} {...layer} />
                  ))}
              </LayerManager>
            )}
          </Map>
          <Timeline className="timeline" activeTab={scenario} data={timelineData} hideHeader />
          <Modal
            title="Bioclimatic variables data"
            text={`Bioclimatic variables derived from Copernicus describing temperature and precipitation annual tendencies, seasonality
                  and extreme climatic conditions, including a combination of both environmental factors for current and future scenarios.`}
            storageKey="bioclimatic"
          />
          <RampLegend
            title="Anual Mean Temperature"
            colorRamp={['#FEF6B5', '#FFA679', '#E15383']} // purple
            lowEndName="Low"
            highEndName="High"
            // handleOpacity={o => return o}
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
  timelineData: PropTypes.object,
  viewport: PropTypes.object,
  setViewport: PropTypes.func
};

export default BioClimaticPage;
