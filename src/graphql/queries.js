import { useQuery } from 'urql';

const useBuildBaseQuery = query => {
  const result = useQuery({ query });
  return result && result[0];
};

export const useSpeciesPerCountry = iso => {
  return useBuildBaseQuery(`{
    species(where: {
      countrySpecieDistributions_every: {
        country: { iso: "${iso}" }
      }
    }) {
      id,
      name,
      scientificName,
      wikipediaSlug
    },
    countries {
      iso,
      name
    },
    scenarios{
      name,
      shortName,
      key
    },
    countrySpecieDistributions(where: {
      country: { iso: "${iso}" },
    }) {
      summary,
      year,
      specie { scientificName },
      scenario { key }
    }
  }`);
};

export const useCountries = () => {
  return useBuildBaseQuery(`{
    countries {
      iso,
      name
    }
  }`);
};

export const useBiovars = () => {
  return useBuildBaseQuery(`{
    biovars{
      name,
      key
    }
  }`);
};

export const useYearsPerScenario = (iso, scenarioKey) => {
  return useBuildBaseQuery(`{
    countryBiovarDistributions(where: {
     country: { iso: "${iso}" },
     scenario: { key: "${scenarioKey}" } 
   }) {
     year
   }
 }`);
};

export const useScenariosPerCountry = iso => {
  return useBuildBaseQuery(`{
    scenarios(where: {
      countryBiovarDistributions_some: {
        country: { iso: "${iso}" }
      },
    }) {
      key,
      name,
      shortName,
      countryBiovarDistributions {
        year
  		}
    }
  }`);
};

export const useCountryBiovarDistributionsPerYearsRangeAndCountry = (
  fromYear,
  toYear,
  iso,
  scenario
) => {
  return useBuildBaseQuery(`{
    countryBiovarDistributions(where: {
      year_lte: ${toYear},
      year_gte: ${fromYear},
      country: { iso: ${iso} },
      scenario: { key: ${scenario} }
    }) {
      summary,
      year,
      biovar { key }
    }
  }`);
};
