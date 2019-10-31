import React, { useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useScenariosPerCountry } from 'graphql/queries';
import { useQueryParams, setQueryParams } from 'url.js';

import { minBy, maxBy } from 'lodash';

import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  
  const { match } = props;
  const { iso } = (match && match.params) || {};

  const location = useLocation();
  const history = useHistory();
  const currentQueryParams = useQueryParams();

  const { futureScenario } = currentQueryParams;
  const { data } = useScenariosPerCountry(iso);

  const scenarios = data && data.scenarios;
  const futureScenarios = scenarios && scenarios.filter(({ key }) => key !== 'current');
  const currentScenarios = scenarios && scenarios.filter(({ key }) => key === 'current');

  const activeFutureScenario = useMemo(
    () =>
      futureScenarios && futureScenarios.length ? futureScenario || futureScenarios[0].key : '',
    [futureScenarios, futureScenario]
  );

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

  const getStartYear = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return scenarioYears && minBy(scenarioYears, ({ year }) => year).year;
  };

  const getEndYear = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return scenarioYears && maxBy(scenarioYears, ({ year }) => year).year;
  };

  const futureScenariosData =
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

  const currentScenariosData =
    currentScenarios &&
    currentScenarios.reduce((acc, sc) => {
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

  return (
    <Component
      viewport={viewport}
      setViewport={setViewport}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      activeFutureScenario={activeFutureScenario}
      setFutureScenario={setFutureScenario}
      futureScenariosData={futureScenariosData}
      currentScenariosData={currentScenariosData}
    />
  );
};

export default DistributionPage;
