import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import './styles.scss';

function SpeciesPage({ match }) {
  const { iso, id } = (match && match.params) || {};
  const wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  const [wikiInfo, setInfo] = useState('');
  const [activeCountry, setCountry] = useState(null);
  const [species, setSpecies] = useState([]);
  const [activeSpecie, setSpecie] = useState(null);

  const [result] = useQuery({
    query: `
    {
      countrySpecieDistributions(where:{
        country: {
          iso: "SWE"
        }
      }) {
        country {
          iso,
          name
        },
        specie {
          name,
          wikipediaSlug,
          id
        }
      }
    }
    `
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (data) {
      const distrib = data.countrySpecieDistributions;
      setCountry(distrib && distrib[0] && distrib[0].country);
      setSpecies(distrib.map(d => d.specie));
    }
  }, [data, setCountry, setSpecies]);

  useEffect(() => {
    if (species && species.length) setSpecie(species.find(sp => sp.id === id) || species[0]); // TODO: modify with right IDs
  }, [id, species, setSpecie]);

  useEffect(() => {
    if (activeSpecie) {
      fetch(`${wikiURL}${activeSpecie && activeSpecie.wikipediaSlug}`)
        .then(r => r.json())
        .then(r => {
          setInfo(r.extract);
        });
    }
  }, [activeSpecie, setInfo]);

  return (
    <div className="c-species">
      {fetching && <p>Loading...</p>}
      {error && <p>Error retrieving the data</p>}
      {!fetching && !error && (
        <div className="content">
          <p>
            Species in {activeCountry ? activeCountry.name : iso} with id {id}
          </p>
          <br />
          <p>List of species:</p>
          {species &&
            species.map(s => (
              <Link key={s.id} to={`/${activeCountry.iso}/species/${s.id}`}>
                <p>{s.name}</p>
              </Link>
            ))}
          <br />
          <br />
          <p>{wikiInfo}</p>
        </div>
      )}
    </div>
  );
}

SpeciesPage.propTypes = {
  match: PropTypes.object
};

export default SpeciesPage;
