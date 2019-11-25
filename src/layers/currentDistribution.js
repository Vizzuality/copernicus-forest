import { SPECIES_RAMP_COLORS } from 'constants.js';

// vector carto layer for species distribution data, scenario "current"
export default (iso, species, opacity = 1) => {
  const SCENARIO = 'current';
  return {
    id: `${iso}${species}${SCENARIO}`,
    name: 'Current distribution carto layer',
    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        species
      }
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval, b.species, b.scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
            },
            type: 'cartodb'
          }
        ],
        maxzoom: 3,
        minzoom: 2,
        vectorLayers: [
          {
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
      },
      params_config: [],
      sql_config: [
        {
          key: 'where',
          key_params: [
            {
              key: 'iso3',
              required: true
            }
          ]
        },
        {
          key: 'where2',
          key_params: [
            {
              key: 'species',
              required: true
            },
            {
              key: 'scenario',
              required: true,
              default: SCENARIO
            }
          ]
        }
      ]
    },
    provider: 'cartodb'
  };
};
