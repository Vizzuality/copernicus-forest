/* eslint-disable no-console */
const fetch = require('isomorphic-fetch');
const pMap = require('p-map');
// List of species for a country
const countryBiovarData = require('./ESP/biovarRel.json');
const errors = require('./errors.json');

// graphCMS settings > Endpoints
const endpoint = process.env.graphCMSURL;
// Ask for this token or get it from graphCMS settings > Permanent Auth Tokens > DATA IMPORT | MUTATION
// then export it before running this script
const token = process.env.graphCMSImportToken;

if (!token || !endpoint) throw Error('Please enter credentials');

// Our mutation to write data to our database
const createCountryBiovarRel = `
mutation createCountryBiovarDistribution(
  $country: CountryWhereUniqueInput,
  $biovar: BiovarWhereUniqueInput,
  $scenario: ScenarioWhereUniqueInput,
  $year:Int,
  $summary:Float
){
  createCountryBiovarDistribution(data: {
    biovar: {
      connect: $biovar
    },
    country: {
      connect: $country
    },
    scenario: {
      connect: $scenario
    }
    year: $year,
    summary: $summary
  }){
    id
  }
}
`;

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

    if (resp.status !== 200) throw Error({ text: resp.statusText, status: resp.status });
  } catch (error) {
    // console.log(`${error.status}: ${error.statusText}`);
    console.log(`${JSON.stringify(variables)},`);
  }
}

/*
 * First: biovar importing.
 * Biovars data is already in CMS, so we only connect to it. No need to create new biovars.
 *
 * Second: create list of coutry-biovars relations
 */

const mapper = async relation => {
  const send = scenario => {
    const countryBiovarQueryData = {
      year: relation.timeInterval,
      summary: +relation.weightedMean.toFixed(1),
      biovar: {
        key: relation.biovar
      },
      country: {
        iso: relation.iso
      },
      scenario: {
        key: scenario
      }
    };
    postQuery(createCountryBiovarRel, countryBiovarQueryData);
  };
  if (relation.scenario === 'current') {
    send('rcp45');
    send('rcp85');
  } else send(relation.scenario);
};

const errorMapper = async row => {
  // Retrying POST with problematic rows (prev 503 responses).
  postQuery(createCountryBiovarRel, row);
};

let promises;
if (!errors.length) {
  promises = pMap(countryBiovarData, mapper, { concurrency: 1, stopOnError: false });
} else {
  console.log(`Trying to fix ${errors.length} errors`);
  promises = pMap(errors, errorMapper, { concurrency: 1, stopOnError: false });
}

promises.catch(error => console.error(error));
