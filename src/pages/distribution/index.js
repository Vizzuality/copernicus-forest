import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { uniqBy, sortBy } from 'lodash';
import { useScenariosPerCountry } from 'graphql/queries';
import { useQueryParams, setQueryParams } from 'url.js';
import { COUNTRIES_DEFAULT_VIEWPORTS, DEFAULT_LAYER_OPACITY } from 'constants.js';
import speciesDistributionLayer from 'layers/speciesDistribution';
import currentDistributionLayer from 'layers/currentDistribution';
import speciesOccurenceLayer from 'layers/speciesOccurence';

import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  const [yearIndex, setYearIndex] = useState(0);

  const { match, activeSpecies } = props;
  const { iso } = (match && match.params) || {};

  useEffect(() => setViewport(COUNTRIES_DEFAULT_VIEWPORTS[iso]), [iso]);

  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();

  const { futureScenario, currentScenario, opacity } = currentQueryParams;
  const { data } = useScenariosPerCountry(iso);

  const scenarios = data && data.scenarios;
  const futureScenarios =
    scenarios && sortBy(scenarios.filter(({ key }) => key !== 'current'), 'key');

  const activeFutureScenario =
    futureScenarios && futureScenarios.length ? futureScenario || futureScenarios[0].key : '';
  const setFutureScenario = sc => {
    setQueryParams({ ...currentQueryParams, futureScenario: sc }, location, history);
  };

  const activeCurrentScenario = currentScenario || 'modeled';
  const setCurrentScenario = sc => {
    setQueryParams({ ...currentQueryParams, currentScenario: sc }, location, history);
  };

  const layerOpacity = useMemo(() => {
    return opacity && Number(opacity) ? Number(opacity) / 100 : DEFAULT_LAYER_OPACITY / 100;
  }, [opacity]);

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

  const currentScenariosData = {
    observed: {
      name: 'observed',
      start: 0,
      end: 0,
      step: 1
    },
    modeled: {
      name: 'modeled',
      start: 0,
      end: 0,
      step: 1
    }
  };

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

  const selectedYear = useMemo(() => years && years[yearIndex], [years, yearIndex]);
  const speciesName = useMemo(() => activeSpecies && activeSpecies.scientificName, [activeSpecies]);

  const futureDistLayers = useMemo(() => {
    const futureDistLayer = speciesDistributionLayer(
      iso,
      speciesName,
      activeFutureScenario,
      selectedYear,
      layerOpacity
    );
    return [futureDistLayer].map(l => ({ ...l, active: true }));
  }, [iso, speciesName, activeFutureScenario, selectedYear, layerOpacity]);

  const currentDistLayers = useMemo(() => {
    let selectedLayer;
    if (activeCurrentScenario === 'observed') {
      selectedLayer = speciesOccurenceLayer(iso, speciesName, 1);
    } else {
      selectedLayer = currentDistributionLayer(iso, speciesName, layerOpacity);
    }
    return [selectedLayer].map(l => ({ ...l, active: true }));
  }, [iso, speciesName, layerOpacity, activeCurrentScenario]);

  return (
    <Component
      viewport={viewport}
      setViewport={setViewport}
      activeFutureScenario={activeFutureScenario}
      setFutureScenario={setFutureScenario}
      futureScenariosData={futureScenariosData}
      futureScenariosLayers={futureDistLayers}
      currentScenariosData={currentScenariosData}
      currentScenariosLayers={currentDistLayers}
      activeCurrentScenario={activeCurrentScenario}
      setCurrentScenario={setCurrentScenario}
      yearIndex={yearIndex}
      setYearIndex={setYearIndex}
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
