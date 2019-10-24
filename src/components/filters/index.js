import React, { useMemo } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';
import { useScenariosPerCountry } from 'graphql/queries';
import { getYearsForScenario, getYearsRange, getEarliestAndLatestYears, parseYears } from './utils';
import Component from './component';

const Container = () => {
  // location, query params
  const match = useRouteMatch('/:country');
  const location = useLocation();
  const history = useHistory();

  const { country } = (match && match.params) || {};
  const currentQueryParams = useQueryParams();
  const { startYear, endYear, scenario } = currentQueryParams;

  // graphql
  const { data } = useScenariosPerCountry(country);

  // parsing
  const scenarios = data && data.scenarios;
  const parsedScenarios =
    scenarios &&
    scenarios.map(sc => ({
      label: sc.name,
      value: sc.key
    }));

  // computed properties
  const chosenScenario = useMemo(
    () => (parsedScenarios && parsedScenarios.length ? scenario || parsedScenarios[0].value : ''),
    [parsedScenarios, scenario]
  );

  const years = useMemo(
    () => scenarios && chosenScenario && getYearsForScenario(chosenScenario, scenarios),
    [scenarios, chosenScenario]
  );
  const parsedYears = useMemo(() => years && parseYears(years), [years]);

  const chosenStartYear = useMemo(
    () =>
      scenarios && scenarios.length && chosenScenario
        ? startYear || getEarliestAndLatestYears(chosenScenario, scenarios).earliest
        : '',
    [scenarios, chosenScenario, startYear]
  );
  const chosenEndYear = useMemo(
    () =>
      scenarios && scenarios.length && chosenScenario
        ? endYear || getEarliestAndLatestYears(chosenScenario, scenarios).latest
        : '',
    [scenarios, chosenScenario, endYear]
  );

  const enabledStartYears = useMemo(
    () => parsedYears && parsedYears.filter(o => o.value <= chosenEndYear),
    [parsedYears, chosenEndYear]
  );
  const enabledEndYears = useMemo(
    () => parsedYears && parsedYears.filter(o => o.value >= chosenStartYear),
    [parsedYears, chosenStartYear]
  );

  // url query params setters
  const setStartYearQuery = year =>
    setQueryParams({ ...currentQueryParams, startYear: year }, location, history);
  const setEndYearQuery = year =>
    setQueryParams({ ...currentQueryParams, endYear: year }, location, history);
  const setScenario = sc => {
    const scenarioYears = getYearsForScenario(sc, scenarios);
    const { earliest, latest } = getYearsRange(scenarioYears);
    setQueryParams({ scenario: sc, startYear: earliest, endYear: latest }, location, history);
  };

  // callbacks
  const setStartYear = year => {
    setStartYearQuery(year);
  };

  const setEndYear = year => {
    setEndYearQuery(year);
  };

  return (
    <Component
      startYear={chosenStartYear}
      setStartYear={setStartYear}
      setEndYear={setEndYear}
      setScenario={setScenario}
      parsedYears={parsedYears}
      enabledStartYears={enabledStartYears}
      endYear={chosenEndYear}
      enabledEndYears={enabledEndYears}
      scenario={chosenScenario}
      parsedScenarios={parsedScenarios}
    />
  );
};

export default Container;
