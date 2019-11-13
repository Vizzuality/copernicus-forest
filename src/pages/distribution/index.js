import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { uniqBy, sortBy } from 'lodash';
import { useScenariosPerCountry } from 'graphql/queries';
import { useQueryParams, setQueryParams } from 'url.js';
import { COUNTRIES_DEFAULT_VIEWPORTS } from 'constants.js';
import { vectorLayerCarto, currentDistributionCartoLayer } from 'layers';

import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  const [opacity, setOpacity] = useState(1);
  const [yearIndex, setYearIndex] = useState(0);

  const { match, activeSpecies } = props;
  const { iso } = (match && match.params) || {};

  useEffect(() => setViewport(COUNTRIES_DEFAULT_VIEWPORTS[iso]), [iso]);

  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();

  const { futureScenario } = currentQueryParams;
  const { data } = useScenariosPerCountry(iso);

  const scenarios = data && data.scenarios;
  const futureScenarios =
    scenarios && sortBy(scenarios.filter(({ key }) => key !== 'current'), 'key');

  const activeFutureScenario =
    futureScenarios && futureScenarios.length ? futureScenario || futureScenarios[0].key : '';

  const setFutureScenario = sc => {
    setQueryParams({ ...currentQueryParams, futureScenario: sc }, location, history);
  };

  const zoomIn = () => {
    const { zoom } = viewport;
    const newZoom = zoom + 1 <= 24 ? zoom + 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  const zoomOut = () => {
    const { zoom } = viewport;
    const newZoom = zoom >= 1 ? zoom - 1 : zoom;
    setViewport(vp => ({ ...vp, zoom: newZoom }));
  };

  const getYears = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return (
      scenarioYears &&
      uniqBy(scenarioYears, 'year')
        .map(({ year }) => year)
        .sort()
    );
  };

  const scenarioYears = useMemo(() => {
    return (
      futureScenarios &&
      futureScenarios.reduce((acc, sc) => {
        const years = getYears(sc);
        return { ...acc, [sc.key]: years };
      }, {})
    );
  }, [futureScenarios]);

  const futureScenariosData =
    futureScenarios &&
    futureScenarios.reduce((acc, sc) => {
      const years =
        scenarioYears && scenarioYears[sc.key]
          ? scenarioYears[sc.key].filter(year => year !== 1995)
          : [];
      return {
        ...acc,
        [sc.key]: {
          name: sc.shortName,
          start: 0,
          end: years.length - 1,
          years,
          step: 1
        }
      };
    }, {});

  useEffect(() => {
    if (yearIndex !== 0) {
      setYearIndex(0);
    }
    // in this particular case we want to reset the activeIndex when tab changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFutureScenario]);

  const years =
    futureScenariosData && activeFutureScenario && futureScenariosData[activeFutureScenario].years;

  const currentYear = useMemo(() => years && years[yearIndex], [years, yearIndex]);
  const speciesName = useMemo(() => activeSpecies && activeSpecies.name, [activeSpecies]);

  const futureDistLayers = useMemo(() => {
    const futureDistLayer = vectorLayerCarto(
      iso,
      speciesName,
      activeFutureScenario,
      currentYear,
      opacity
    );
    return [futureDistLayer].map(l => ({ ...l, active: true }));
  }, [iso, speciesName, activeFutureScenario, currentYear, opacity]);

  const currentDistLayers = useMemo(() => {
    const currentDistLayer = currentDistributionCartoLayer(iso, speciesName, opacity);
    return [currentDistLayer].map(l => ({ ...l, active: true }));
  }, [iso, speciesName, opacity]);

  return (
    <Component
      viewport={viewport}
      setViewport={setViewport}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      activeFutureScenario={activeFutureScenario}
      setFutureScenario={setFutureScenario}
      futureScenariosData={futureScenariosData}
      futureScenariosLayers={futureDistLayers}
      currentScenariosLayers={currentDistLayers}
      yearIndex={yearIndex}
      setYearIndex={setYearIndex}
      setOpacity={setOpacity}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

DistributionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  activeSpecies: PropTypes.object
};
export default DistributionPage;
