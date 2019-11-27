import { SPECIES_RAMP_COLORS } from 'constants.js';

// vector carto layer for species occurence data
export default (iso, species, opacity = 1) => {
  return {
    id: `${iso}${species}`,
    name: 'Species occurence carto layer',
    sqlParams: {
      where: {
        iso3: iso,
        species
      }
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `SELECT * FROM all_spp_occurence {{where}}`
            },
            type: 'cartodb'
          }
        ],
        maxzoom: 3,
        minzoom: 2,
        vectorLayers: [
          {
            paint: {
              'circle-color': SPECIES_RAMP_COLORS[2],
              'circle-opacity': opacity,
              'circle-radius': {
                stops: [[12, 2], [22, 180]]
              }
            },
            'source-layer': 'layer0',
            type: 'circle'
          }
        ]
      },
      params_config: [],
      sql_config: [
        {
          key: 'where',
          key_params: [
            {
              key: 'iso3',
              required: true
            },
            {
              key: 'species',
              required: true
            }
          ]
        }
      ]
    },
    provider: 'cartodb'
  };
};
