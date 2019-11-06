import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { useScenariosPerCountry } from 'graphql/queries';
import { useQueryParams, setQueryParams } from 'url.js';
import { uniqBy } from 'lodash';

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

  const getYears = sc => {
    const scenarioYears = sc.countryBiovarDistributions;
    return (
      scenarioYears &&
      uniqBy(scenarioYears, 'year')
        .map(({ year }) => year)
        .filter(year => year !== 1995)
        .sort()
    );
  };

  const futureScenariosData =
    futureScenarios &&
    futureScenarios.reduce((acc, sc) => {
      const years = getYears(sc);
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

  const currentScenariosData =
    currentScenarios &&
    currentScenarios.reduce((acc, sc) => {
      return {
        ...acc,
        [sc.key]: {
          name: sc.name,
          startYear: 0,
          endYear: 0,
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
      activeFutureScenario={activeFutureScenario}
      setFutureScenario={setFutureScenario}
      futureScenariosData={futureScenariosData}
      currentScenariosData={currentScenariosData}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

DistributionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};
export default DistributionPage;
