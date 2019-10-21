const fetch = require('isomorphic-fetch');
// List of species for a country
const countryBiovarData = require('./TZA/biovarRel.json');

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
 * First: biovar importing.
 * Biovars data is already in CMS, so we only connect to it. No need to create new biovars.
 *
 * Second: create list of coutry-biovars relations
 */

const countryBiovarsSet = new Set();
countryBiovarData.forEach(relation => countryBiovarsSet.add(relation));

promises.push(
  [...countryBiovarsSet].map(async relation => {
    try {
      const countryBiovarQueryData = {
        year: relation.timeInterval,
        summary: relation.propTotalArea,
        biovar: {
          key: relation.biovar
        },
        country: {
          iso: relation.iso
        },
        scenario: {
          key: relation.scenario
        }
      };

      console.log(relation, countryBiovarQueryData);
      postQuery(createCountryBiovarRel, countryBiovarQueryData);
    } catch (error) {
      console.log(error);
    }
  })
);

Promise.all(promises).then(() => console.log('Done'));
