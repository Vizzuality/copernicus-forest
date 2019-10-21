const fetch = require('isomorphic-fetch');
// List of species for a country
const biovars = require('./biovarList.json');

// graphCMS settings > Endpoints
const endpoint = process.env.graphCMSURL;
// Ask for this token or get it from graphCMS settings > Permanent Auth Tokens > DATA IMPORT | MUTATION
// then export it before running this script
const token = process.env.graphCMSImportToken;
if (!token || !endpoint) throw Error('Please enter credentials');

const createBiovar = `mutation createBiovar(
	$name:String,
  $key:String!
){
  createBiovar(data:{
    name:$name,
    key:$key
  }){
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
const biovarsSet = new Set();
biovars.forEach(specie => biovarsSet.add(specie));

promises.push(
  [...biovarsSet].map(async biovar => {
    try {
      const biovarQueryData = {
        name: biovar.commonName,
        key: biovar.codeName
      };

      console.log(biovarQueryData);
      postQuery(createBiovar, biovarQueryData);
    } catch (error) {
      console.log(error);
    }
  })
);

Promise.all(promises).then(() => console.log('Done'));
