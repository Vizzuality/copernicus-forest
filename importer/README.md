# CMS data importer scripts.
Description of the scripts to import data to graphCMS. Check the files in the ISO folders (like `./CAN`) to see the data structure used in the scripts.

## Biovar importer

Relevant fields in the schema when importing biovars are:

### Biovar
```
{
  name: String (example: "Annual Mean Temperature"),
  key: String (example: "biovar01"),
  distributions: Reference (to CountryBiovarDistributions entity)
}
```
The list of biovars (biovar01-19) has already been imported and it's common for all countries. No need to re-import it, but __if you need to__ (to modify it, for example), you can delete the biovars from the CMS and then check the `biovars` folder, which contains the list of biovars and the `biovarsImporter` script.

### Scenario
The list of scenarios has already been added manually to the CMS, there's only 3 scenarios and the keys are "current", "rcp45" and "rcp85".

### Country
The list of countries has also been added manually to the CMS, as it's a fixed list of the 5 countries (currently) that this project considers. The keys for the countries correspond to their ISO codes.

### Country Biovar Distribution
```
{
  year: Int (this year is the time interval of the data point, but they represent decades),
  summary: Float (actual value of the data point),
  Biovar: Reference (to its Biovar, by key...e.g. { key: "biovar02" }),
  Country: Reference (to Country by iso, e.g. { iso: "CAN" }),
  Scenario: Reference (to Scenario by key, e.g. { key: "rcp85" })
}
```

Now, to import the relation entities for every country, you need to have them in a .json file like the ones present in the ISO folders (`biovarRel.json` files). Then the `countryBiovarImporter` script takes every row in the JSON file, builds the CountryBiovarDistribution object, and tries to push it to graphCMS using the mutation query plus the data. **Note**: remember to modify the imports in the head of the file to use the corresponding ISO folder of the country which data you're importing.

**If you find any errors** (sometimes the server returns `503` when uploading a lot of data), you might want to redirect the node output to a buffer.json file (like `node countryBiovarImporter.js > buffer.json`), because then you'll find the rows that couldn't be imported in a JSON format. Then you can move those lines to the `errors.json` file (between the [ ] characters) and effectively have a JSON-formatted array of the rows that couldn't be imported. Then delete `buffer.json` or however it's called.

The script now takes only the error rows and tries to re-import those.

## Species importer

First of all, this workflow has been made considering that the list of species for a given country is different (some species may be the same, there may be new ones, etc) to other countries.

The relevant fields in the schema when importing species are:

### Specie
Schema data:
```
{
  name: String (e.g. "Jack pine"),
  scientificName: String (e.g. "Pinus banksiana")
  wikipediaSlug: String (e.g. "Jack_pine"
  key: String (example: "biovar01"),
  countrySpecieDistributions: Reference (to CountrySpecieDistributions entity)
}
```

The list of species for a given country has different fields than the schema data (check `species.json` in the ISO folders). For every specie, the JSON file with the list of species should have:

```
{
  scientificName: String,
  wikipediaSlug: String,
  gbifId: Int,
  country: String (iso) 
}
```

The parsing process is detailed afterwards.

### Country Specie Distribution
```
{
  year: Int (this year is the time interval of the data point, but they represent decades),
  summary: Float (actual value of the data point),
  Specie: Reference (to its Specie, by scientific Name...e.g. { key: "Pinus resinosa" }),
  Country: Reference (to Country by iso, e.g. { iso: "CAN" }),
  Scenario: Reference (to Scenario by key, e.g. { key: "rcp85" })
}
```

Similar to the `countryBiovarImporter` script, the `countrySpecieImporter` parses the data present in the JSON file (prev .csv file) to create an entity for every year, scenario, species and country. This script works for a given country (again, remember to modify the head of the file), loops through the list of species to add those that are not already in the CMS (because the `scientificName` key is unique, any post with a duplicate species will be rejected by graphCMS).

When adding species to the CMS, we also use the GBIF API to get the common name (or vernacular name) of the species, to fill the `name` field in the CMS.

After importing the list of species, we loop through the countrySpecies data (relations, `speciesRel.json` file) building the `countrySpecieDistribution` object, then post it.

I didn't find any errors when importing species data, that is why there is no error handling or re-uploading, but the script could be easily modified to adopt this workflow if necessary.

