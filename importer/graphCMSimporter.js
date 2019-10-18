const fetch = require('isomorphic-fetch');
// List of species for a country
const speciesData = require('./data.test.json');
const countrySpeciesData = require('./csvjson.test.json');

// graphCMS settings > Endpoints
const endpoint = process.env.graphCMSURL;
// Ask for this token or get it from graphCMS settings > Permanent Auth Tokens > DATA IMPORT | MUTATION
// then export it before running this script
const token = process.env.graphCMSImportToken;

if (!token || !endpoint) throw Error('Please enter credentials');

// Our mutation to write data to our database
const createCountrySpecieRel = `mutation createCountrySpecieDistribution(
  $country: CountryWhereUniqueInput,
  $specie: SpecieWhereUniqueInput,
  $scenario: ScenarioWhereUniqueInput,
  $year: Int,
  $value: Float
){
  createCountrySpecieDistribution(data: {
    specie: {
      connect: $specie
    }
    country: {
      connect: $country
    },
    scenario: {
      connect: $scenario
    }
    year: $year,
    summary: $value
  }
  ) {
    id
  }
}`;

const createSpecie = `mutation createSpecie(
  $name:String,
  $scientificName: String,
  $wikipediaSlug: String
){
  createSpecie(data: {
    name: $name,
    scientificName: $scientificName,
    wikipediaSlug: $wikipediaSlug
  }) {
    id
  }
}`;

async function postQuery(query, variables) {
  // The Fetch statement to send the data for each
  const resp = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({ query, variables })
  });

  // Parse the response to verify success
  const body = await resp.json();
  if (body.errors && body.errors.length > 0) throw Error(body.errors[0].message);
  const bodyData = await body.data;

  console.log('Uploaded', bodyData);
}

const promises = [];

/*
 * First: create list of species connected to a given country
 */

// Sets allow us to force unique entries,
const speciesSet = new Set();

// Pushing our classes into our set.
speciesData.forEach(specie => speciesSet.add(specie));

promises.push(
  [...speciesSet].map(async specie => {
    try {
      // TODO: prob refactor this
      const gbifURL = `http://api.gbif.org/v1/species?name=${specie.scientificName}`;
      const gbifRawData = await fetch(gbifURL);
      const gbifJSONData = await gbifRawData.json();
      const gbifData =
        gbifJSONData.results && gbifJSONData.results.length > 0 && gbifJSONData.results[0];
      const name = gbifData.vernacularName || gbifData.canonicalName || specie.scientificName;

      const speciesQueryData = {
        name,
        scientificName: specie.scientificName,
        wikipediaSlug: specie.wikipediaSlug
      };

      console.log(speciesQueryData);
      postQuery(createSpecie, speciesQueryData);
    } catch (error) {
      console.log(error);
    }
  })
);

/*
 * Second: create list of coutry-species relations
 */

const countrySpeciesSet = new Set();
countrySpeciesData.forEach(relation => countrySpeciesSet.add(relation));

promises.push(
  [...countrySpeciesSet].map(async relation => {
    try {
      const countrySpeciesQueryData = {
        year: relation.timeInterval,
        summary: relation.propTotalArea,
        specie: {
          scientificName: relation.species
        },
        country: {
          iso: relation.iso
        },
        scenario: {
          key: relation.scenario
        }
      };

      console.log(relation, countrySpeciesQueryData);
      postQuery(createCountrySpecieRel, countrySpeciesQueryData);
    } catch (error) {
      console.log(error);
    }
  })
);

Promise.all(promises).then(() => console.log('Done'));
