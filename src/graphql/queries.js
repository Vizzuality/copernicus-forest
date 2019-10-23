import { useQuery } from 'urql';

const useBuildBaseQuery = query => {
  const result = useQuery({
    query: `${query}`
  });
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

export const useBiovars = () => {
  return useBuildBaseQuery(`{
    biovars{
      name,
      key
    }
  }`);
};
