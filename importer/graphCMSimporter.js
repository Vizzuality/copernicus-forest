const fetch = require('isomorphic-fetch');
// List of species for a country
const data = require('./data.json');

// graphCMS settings > Endpoints
const endpoint = process.env.graphCMSURL;
// Ask for this token or get it from graphCMS settings > Permanent Auth Tokens > DATA IMPORT | MUTATION
// then export it before running this script
const token = process.env.graphCMSImportToken;

// Our mutation to write data to our database
const mutation = `mutation createCountrySpecieDistribution($country: CountryWhereUniqueInput, $specie: SpecieCreateWithoutCountrySpecieDistributionsInput){
  createCountrySpecieDistribution(data: {
    specie: {
      create: $specie
    }
    country: {
      connect: $country
    }
    
  }
  ) {
    id
  }
}`;

// Sets allow us to force unique entries,
const speciesSet = new Set();

// Pushing our wine classes into our set.
data.forEach(specie => speciesSet.add(specie));

const promises = [...speciesSet].map(async specie => {
  try {
    const gbifURL = `http://api.gbif.org/v1/species?name=${specie.scientificName}`;
    console.log(gbifURL);

    // TODO: prob refactor this
    const gbifRawData = await fetch(gbifURL);
    const gbifJSONData = await gbifRawData.json();
    const gbifData =
      gbifJSONData.results && gbifJSONData.results.length > 0 && gbifJSONData.results[0];
    const name = gbifData.vernacularName || gbifData.canonicalName || specie.scientificName;

    const queryData = {
      country: {
        iso: specie.country
      },
      specie: {
        name,
        scientificName: specie.scientificName,
        wikipediaSlug: specie.wikipediaSlug
      }
    };

    // The Fetch statement to send the data for each
    const resp = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify({
        query: mutation,
        variables: queryData
      })
    });

    // Parse the response to verify success
    const body = await resp.json();
    if (body.errors && body.errors.length > 0) throw Error(body.errors[0].message);
    const bodyData = await body.data;

    console.log('Uploaded', name, bodyData);
    return;
  } catch (error) {
    console.log(error);
  }
});

Promise.all(promises).then(() => console.log('Done'));
