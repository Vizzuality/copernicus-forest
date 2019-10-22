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
  const { fromY, toYear, scenario } = currentQueryParams;

  // graphql
  const { data } = useScenariosPerCountry(country);
  const { data: yearsData } = useYearsPerScenario(country, scenario);

  // state
  const [years, setYears] = useState(null);
  const [enabledFromYears, setEnabledFromYears] = useState(null);
  const [enabledToYears, setEnabledToYears] = useState(null);

  // parsing
  const scenarios = data && data.scenarios;
  const parsedScenarios =
    scenarios &&
    scenarios.map(sc => ({
      label: sc.name,
      value: sc.key
    }));
  const parsedYears =
    years &&
    years.map(o => ({
      label: o.year,
      value: o.year
    }));
  const orderedYears = parsedYears && orderBy(parsedYears, 'value');

  // url query params setters
  const setScenario = sc =>
    setQueryParams({ ...currentQueryParams, scenario: sc }, location, history);
  const setFromYear = year =>
    setQueryParams({ ...currentQueryParams, fromY: year }, location, history);
  const setToYear = year =>
    setQueryParams({ ...currentQueryParams, toYear: year }, location, history);
  const setQueryParamsYears = (fromYear, toY) =>
    setQueryParams({ ...currentQueryParams, fromY: fromYear, toYear: toY }, location, history);

  // side effects
  useEffect(() => {
    if (parsedScenarios && parsedScenarios.length && !scenario) {
      setScenario(parsedScenarios[0].value);
    }
  }, [parsedScenarios, scenario]);

  useEffect(() => {
    if (yearsData) {
      setYears(uniqBy(yearsData.countryBiovarDistributions, 'year'));
    }
  }, [yearsData]);

  useEffect(() => {
    if (years) {
      const earliestYear = minBy(years, 'year');
      const latestYear = maxBy(years, 'year');
      if (earliestYear && latestYear) {
        setQueryParamsYears(earliestYear.year, latestYear.year);
      }
    }
  }, [years]);

  // callbacks
  const setYearFrom = year => {
    setFromYear(year);
    const enabledTo = orderedYears.filter(o => o.value >= year);
    setEnabledToYears(enabledTo);
  };

  const setYearTo = year => {
    setToYear(year);
    const enabledFrom = orderedYears.filter(o => o.value <= year);
    setEnabledFromYears(enabledFrom);
  };

  return (
    <Component
      fromY={fromY}
      setYearFrom={setYearFrom}
      setYearTo={setYearTo}
      setScenario={setScenario}
      orderedYears={orderedYears}
      enabledFromYears={enabledFromYears}
      toYear={toYear}
      enabledToYears={enabledToYears}
      scenario={scenario}
      parsedScenarios={parsedScenarios}
    />
  );
};

export default Container;
