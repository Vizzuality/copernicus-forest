import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import LayerToggle from 'components/map/controls/layer-toggle';
import Zoom from 'components/map/controls/zoom';
import Modal from 'components/modal';
import Map from 'components/map';
import Accordion from 'components/accordion';
import Filters from 'components/filters';
import Timeline from 'components/map/controls/timeline';
import RampLegend from 'components/ramp-legend';
import bioclimaticLayer from 'layers/bioclimatic';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { TEMPERATURE_RAMP_COLORS, PERCIPITATION_RAMP_COLORS } from 'constants.js';
import cx from 'classnames';

import { getBuckets } from './utils';

import styles from './styles.module.scss';

function BioClimaticPage(props) {
  const {
    getConfig,
    filters,
    data,
    timelineData,
    viewport,
    setViewport,
    country,
    yearIndex,
    setYearIndex,
    fetching,
    opacity
  } = props;
  const { scenario, parsedScenarios } = filters;

  const parsedScenario = parsedScenarios && parsedScenarios.find(s => s.value === scenario);
  const biovarsList = sortBy(data.biovars, 'key');
  const biovarsData = groupBy(data.countryBiovarDistributions, 'biovar.key');
  const chosenBiovar = useMemo(() => filters.biovar || (biovarsList[0] && biovarsList[0].key), [
    biovarsList,
    filters.biovar
  ]);

  const chosenBiovarItem = biovarsList.find(({ key }) => key === chosenBiovar);

  const years = scenario && timelineData && timelineData[scenario] && timelineData[scenario].years;

  const biovarNumber = chosenBiovar && Number(chosenBiovar.replace('biovar', ''));
  const rampColors = biovarNumber >= 12 ? PERCIPITATION_RAMP_COLORS : TEMPERATURE_RAMP_COLORS; // change colors ramp, depending on the selected biovar

  const buckets = fetching ? [] : getBuckets(biovarsData[chosenBiovar]);
  const bioclimaticLayers = useMemo(() => {
    if (fetching) return [];
    const layer = bioclimaticLayer(
      country,
      scenario,
      chosenBiovar,
      years[yearIndex],
      opacity,
      buckets,
      rampColors
    );
    return [layer].map(l => ({ ...l, active: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biovarsData, chosenBiovar, country, scenario, years, yearIndex, fetching, opacity]);

  // Bioclimatic variables modal:
  const modalOpenedBefore = sessionStorage.getItem('bioclimatic');
  const [isModalOpen, setModalOpen] = useState(!modalOpenedBefore);

  const lowEndValue =
    buckets[0] && chosenBiovarItem ? `${buckets[0].toFixed(1)} ${chosenBiovarItem.unit}` : null;
  const highEndValue =
    buckets[buckets.length - 1] && chosenBiovarItem
      ? `${buckets[buckets.length - 1].toFixed(1)} ${chosenBiovarItem.unit}`
      : null;
  return (
    <div className={cx(styles.bioclimatic, 'l-page')}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Filters {...filters} />
      <div className={styles.content}>
        <div className={styles.bioclimaticChart}>
          <Accordion
            activeItemId={chosenBiovar}
            scrollKey={country}
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
        <div className={styles.mapWrapper}>
          <Map viewport={viewport} setViewport={setViewport}>
            {map => (
              <LayerManager map={map} plugin={PluginMapboxGl}>
                {bioclimaticLayers
                  .filter(l => l.active)
                  .map(layer => (
                    // TODO: fix all eslint-disables
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Layer key={layer.id} {...layer} />
                  ))}
              </LayerManager>
            )}
          </Map>
          <Timeline
            className={styles.timeline}
            activeTab={scenario}
            data={timelineData}
            yearIndex={yearIndex}
            handleOnChange={setYearIndex}
            hideHeader
          />
          <div className={styles.navigationBar}>
            <Zoom viewport={viewport} setViewport={setViewport} />
            <LayerToggle theme={styles.layerToggle} />
          </div>
          <Modal
            title="Bioclimatic variables data"
            text={`Bioclimatic variables derived from Copernicus describing temperature and precipitation annual tendencies, seasonality
                  and extreme climatic conditions, including a combination of both environmental factors for current and future scenarios.`}
            isOpen={isModalOpen}
            afterOpen={() => sessionStorage.setItem('bioclimatic', true)}
            handleClose={() => setModalOpen(false)}
          />
          <RampLegend
            title={`BIO ${biovarNumber + 1}`}
            colorRamp={rampColors} // purple
            lowEndName="Low"
            highEndName="High"
            lowEndValue={lowEndValue}
            highEndValue={highEndValue}
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
  setViewport: PropTypes.func,
  country: PropTypes.string,
  yearIndex: PropTypes.number,
  setYearIndex: PropTypes.func,
  fetching: PropTypes.bool,
  opacity: PropTypes.number
};

export default BioClimaticPage;
