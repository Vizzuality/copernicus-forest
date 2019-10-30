import React, { useState, useEffect } from 'react';
import { useScenariosPerCountry } from 'graphql/queries';
import { minBy, maxBy } from 'lodash';

import Component from './component';

const DistributionPage = props => {
  const [viewport, setViewport] = useState({ zoom: 4, latitude: 40, longitude: -5 });
  const [activeScenario, setActiveScenario] = useState(null);
  const { match } = props;
  const { iso } = (match && match.params) || {};

  const { data } = useScenariosPerCountry(iso);
  const scenarios = data && data.scenarios;
  const futureScenarios = scenarios && scenarios.filter(({ key }) => key !== 'current');

  useEffect(() => {
    scenarios && setActiveScenario(futureScenarios[0].key);
    console.log('futureDistribution: ',activeScenario)
  }, []);

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


  const getStartYear = (scenario) => {
    const scenarioYears = scenario.countryBiovarDistributions;
    return scenarioYears && minBy(scenarioYears, ({ year }) => year).year;
  }

  const getEndYear = (scenario) => {
    const scenarioYears = scenario.countryBiovarDistributions;
    return scenarioYears && maxBy(scenarioYears, ({ year }) => year).year;
  }

  // parsing
  const timelineData =
    futureScenarios &&
    futureScenarios.reduce((acc, sc) => {
        return { ...acc,
          [sc.key]: {
            name: sc.name,
            startYear: getStartYear(sc),
            endYear: getEndYear(sc),
            step: 10
          }
        }
    }, {});

  console.log('parsedScenarios data: ',timelineData)

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
