const fetch = require('isomorphic-fetch');
// List of species for a country
// const speciesData = require('./TZA/species.json');
const speciesData = [];
// const countrySpeciesData = require(`./${process.argv[2] || 'SWE'}/speciesRel.json`);
const countrySpeciesData = require('./SWE/speciesRel.json');

const speciesWhitelist = [
  'Dalbergia',
  'Eucalyptus',
  'Alnus acuminata',
  'Guazuma ulmifolia',
  'Simarouba amara'
];

// graphCMS settings > Endpoints
const endpoint = process.env.graphCMSURL;
// Ask for this token or get it from graphCMS settings > Permanent Auth Tokens > DATA IMPORT | MUTATION
// then export it before running this script
const token = process.env.graphCMSImportToken;

if (!token || !endpoint) throw Error('Please enter credentials');

// Our mutation to write data to our database
const createSpecie = `mutation createSpecie(
  $name:String,
  $scientificName: String!,
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

const createCountrySpecieRel = `mutation createCountrySpecieDistribution(
  $country: CountryWhereUniqueInput,
  $specie: SpecieWhereUniqueInput,
  $scenario: ScenarioWhereUniqueInput,
  $year: Int,
  $summary: Float
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
    summary: $summary
  }
  ) {
    id
  }
}`;

async function postQuery(query, variables) {
  try {
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
    console.log('Uploaded', bodyData.createCountrySpecieDistribution.id);
  } catch (error) {
    console.log(`${JSON.stringify(variables)},`);
  }
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
      const gbifResults = gbifJSONData.results;
      const gbifData = gbifResults.find(r => r.key === specie.gbifId) || gbifResults[0];
      const name = gbifData.vernacularName || gbifData.canonicalName || specie.scientificName;

      const speciesQueryData = {
        name,
        // id: gbifid,
        scientificName: specie.scientificName,
        wikipediaSlug: specie.wikipediaSlug
      };

      // console.log(speciesQueryData);
      postQuery(createSpecie, speciesQueryData);
    } catch (error) {
      console.log('err  ¯\\_(ツ)_/¯', error.message);
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
      const send = scenario => {
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
            key: scenario
          }
        };

        postQuery(createCountrySpecieRel, countrySpeciesQueryData);
      };
      if (speciesWhitelist.indexOf(relation.species) >= 0) {
        if (relation.scenario === 'current') {
          send('rcp45');
          send('rcp85');
        } else send(relation.scenario);
      } else if (relation.timeInterval === 2020 && relation.scenario === 'rcp45')
        console.log(`${relation.species} not in whitelist`);
    } catch (error) {
      console.log('err  ¯\\_(ツ)_/¯', error.message);
    }
  })
);

Promise.all(promises).then(() => console.log('Done. \n', speciesWhitelist));
