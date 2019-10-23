import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';
import { useYearsPerScenario, useScenariosPerCountry } from 'graphql/queries';
import { uniqBy, minBy, maxBy, orderBy } from 'lodash';
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
  
  // util functions
  const getUniqueYears = (allYears) => uniqBy(allYears, 'year');
  const getYearsForScenario = (sc) => {
    const scenarioYears = scenarios.find(s => s.key === sc).countryBiovarDistributions;
    const uniqueYears = scenarioYears && getUniqueYears(scenarioYears);
    return uniqueYears;
  }
  const parseYears = (uniqueYears) => {
    const parsed = uniqueYears.map(o => ({
      label: o.year,
      value: o.year
    }));
    const ordered = parsed && orderBy(parsed, 'value');
    return ordered;
  }

  const getYearsRange = y => {
    const earliestYear = minBy(y, 'year');
    const latestYear = maxBy(y, 'year');
    return {
      earliest: earliestYear && earliestYear.year,
      latest: latestYear && latestYear.year
    };
  };

  // state
  const [enabledStartYears, setEnabledStartYears] = useState(null);
  const [enabledEndYears, setEnabledEndYears] = useState(null);

  // parsing
  const scenarios = data && data.scenarios;
  const parsedScenarios =
    scenarios &&
    scenarios.map(sc => ({
      label: sc.name,
      value: sc.key
    }));
  const years = scenarios && scenario && getYearsForScenario(scenario);
  const parsedYears = years && parseYears(years)

  // url query params setters
  const setStartYearQuery = year =>
    setQueryParams({ ...currentQueryParams, startYear: year }, location, history);
  const setEndYearQuery = year =>
    setQueryParams({ ...currentQueryParams, endYear: year }, location, history);
  const setQueryParamsYears = (startY, endY) =>
    setQueryParams({ ...currentQueryParams, startYear: startY, endYear: endY }, location, history);
  const setScenario = sc => {
    const scenarioYears = getYearsForScenario(sc);
    const { earliest, latest } = getYearsRange(scenarioYears);
    setQueryParams({ scenario: sc, startYear: earliest, endYear: latest }, location, history);
    setEnabledStartYears(null);
    setEnabledEndYears(null);
  };

  // side effects
  // set default scenario once scenarios are fetched
  useEffect(() => {
    if (parsedScenarios && parsedScenarios.length && !scenario) {
      setScenario(parsedScenarios[0].value);
    }
  }, [parsedScenarios, scenario]);

  // callbacks
  const setStartYear = year => {
    setStartYearQuery(year);
    const enabledTo = parsedYears.filter(o => o.value >= year);
    setEnabledEndYears(enabledTo);
  };

  const setEndYear = year => {
    setEndYearQuery(year);
    const enabledFrom = parsedYears.filter(o => o.value <= year);
    setEnabledStartYears(enabledFrom);
  };

  return (
    <Component
      startYear={startYear}
      setStartYear={setStartYear}
      setEndYear={setEndYear}
      setScenario={setScenario}
      parsedYears={parsedYears}
      enabledStartYears={enabledStartYears}
      endYear={endYear}
      enabledEndYears={enabledEndYears}
      scenario={scenario}
      parsedScenarios={parsedScenarios}
    />
  );
};

export default Container;
