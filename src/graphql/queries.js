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
      name
    }
  }`);
};

export const useCountryBiovarDistributionsPerYearsRangeAndCountry = (fromYear, toYear, iso) => {
  return useBuildBaseQuery(`{
    countryBiovarDistributions(where: {
      year_lte: ${toYear},
      year_gte: ${fromYear},
      country: { iso: ${iso} }
    }) {
      summary,
    }
  }`);
};
