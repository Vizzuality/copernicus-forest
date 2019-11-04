import React, { useMemo } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useQueryParams, setQueryParams } from 'url.js';
import { useScenariosPerCountry } from 'graphql/queries';
import { Query } from 'urql';
import { Label } from 'recharts';
import { getYearsForScenario, getYearsRange, getEarliestAndLatestYears, parseYears } from './utils';
import Component from './component';

import styles from './styles.scss';

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
  const scenarios = data && data.scenarios && data.scenarios.filter(s => s.key !== 'current');
  const parsedScenarios =
    scenarios &&
    scenarios.map(sc => ({
      label: `${sc.name} - ${sc.key.replace('rcp45', 'RCP 4.5').replace('rcp85', 'RCP 8.5')}`,
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

  const filters = {
    startYear: String(chosenStartYear),
    setStartYear,
    setEndYear,
    setScenario,
    parsedYears,
    enabledStartYears,
    endYear: String(chosenEndYear),
    enabledEndYears,
    scenario: chosenScenario,
    parsedScenarios
  };

  const getChartConfig = unit => ({
    lines: [
      {
        key: 'value',
        color: styles.colorPink
      }
    ],
    areas: [
      {
        key: 'value',
        color: styles.colorPink
      }
    ],
    yAxis: {
      customTick: true,
      tickSize: 0,
      axisLine: false,
      content: <Label value={unit} position="insideTop" dx={6} dy={-40} fill="#222" />
    },
    xAxis: {
      customTick: true,
      tickSize: 0,
      padding: { left: -30, right: -30 }
    },
    grid: {
      vertical: false
    },
    composedChart: {
      margin: { top: 40, right: 40, left: 0, bottom: 0 }
    },
    height: 300
  });

  if (chosenStartYear && chosenEndYear && country && chosenScenario) {
    return (
      <Query
        query={`{
      biovars{
        name,
        key,
        unit
      },
      countryBiovarDistributions(where: {
        year_lte: ${chosenEndYear},
        year_gte: ${chosenStartYear},
        country: { iso: "${country}" },
        scenario: { key: "${chosenScenario}" }
      }) {
        value: summary,
        name: year,
        biovar { key }
      }
    }`}
      >
        {({ fetching, data: queryData }) =>
          fetching ? null : (
            <Component data={queryData} filters={filters} getConfig={getChartConfig} />
          )}
      </Query>
    );
  }
  return null;
};

export default Container;
