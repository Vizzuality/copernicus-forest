import React, { useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useScenariosPerCountry } from 'graphql/queries';
import { useQueryParams, setQueryParams } from 'url.js';

import { minBy, maxBy } from 'lodash';

import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  // const [activeScenario, setActiveScenario] = useState(null);
  const { match } = props;
  const { iso } = (match && match.params) || {};

  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();

  const { scenario } = currentQueryParams;
  const { data } = useScenariosPerCountry(iso);

  const scenarios = data && data.scenarios;
  const futureScenarios = scenarios && scenarios.filter(({ key }) => key !== 'current');

  const activeScenario = useMemo(
    () => (futureScenarios && futureScenarios.length ? scenario || futureScenarios[0].key : ''),
    [futureScenarios, scenario]
  );

  const setActiveScenario = sc => {
    setQueryParams({ ...currentQueryParams, scenario: sc }, location, history);
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

  const getStartYear = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return scenarioYears && minBy(scenarioYears, ({ year }) => year).year;
  };

  const getEndYear = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return scenarioYears && maxBy(scenarioYears, ({ year }) => year).year;
  };

  // parsing
  const timelineData =
    futureScenarios &&
    futureScenarios.reduce((acc, sc) => {
      return {
        ...acc,
        [sc.key]: {
          name: sc.name,
          startYear: getStartYear(sc),
          endYear: getEndYear(sc),
          step: 10
        }
      };
    }, {});

  console.log('parsedScenarios data: ', timelineData);

  return (
    <Component
      viewport={viewport}
      setViewport={setViewport}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      activeScenario={activeScenario}
      setActiveScenario={setActiveScenario}
      timelineData={timelineData}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default DistributionPage;
