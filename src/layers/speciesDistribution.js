import { SPECIES_RAMP_COLORS } from 'constants.js';

// vector carto layer for species distribution data
export default ({ iso, species, scenario, year, opacity }) => {
  return {
    id: `layer-species-distribution`,
    name: 'Species distribution carto layer',
    type: 'vector',
    active: true,

    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        species
      }
    },

    source: {
      type: 'vector',
      provider: {
        type: 'carto',
        account: 'simbiotica',
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval as year, b.species as species, b.scenario as scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
            },
            type: 'cartodb'
          }
        ]
      }
    },

    render: {
      maxzoom: 3,
      minzoom: 2,
      layers: [
        {
          filter: ['all', ['==', 'year', year], ['==', 'scenario', scenario]],
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'probabilityemca'],
              0,
              SPECIES_RAMP_COLORS[0],
              0.5,
              SPECIES_RAMP_COLORS[1],
              1,
              SPECIES_RAMP_COLORS[2]
            ],
            'fill-opacity': opacity
          },
          'source-layer': 'layer0',
          type: 'fill'
        }
      ]
    }
  };
};
