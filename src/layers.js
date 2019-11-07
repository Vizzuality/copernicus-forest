export const COLOR_RAMP = [
  '#FFFFFF',
  '#F0ECFF',
  '#E2D9FF',
  '#D4C6FF',
  '#C5B4FF',
  '#B7A1FF',
  '#A98EFF',
  '#9A7CFF',
  '#8C69FF',
  '#7E56FF',
  '#7044FF'
];

const transparent = 'rgba(255, 255, 255, 0)';

export const vectorLayerCarto = (iso, species, scenario, opacity = 1) => {
  return {
    id: '0911abc4-546565-d861-4d7a-84d6-0fa07b51d7d8',
    name: 'Committee average',
    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        species,
        scenario
      },
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval, b.species, b.scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
              // sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval, b.scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid WHERE scenario LIKE {{scenarioName}} AND species LIKE {{speciesName}}`
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
                transparent,
                0.05,
                transparent,
                0.15,
                transparent,
                0.2,
                transparent,
                0.25,
                transparent,
                0.3,
                transparent,
                0.35,
                transparent,
                0.4,
                transparent,
                0.45,
                transparent,
                0.5,
                COLOR_RAMP[0],
                0.55,
                COLOR_RAMP[1],
                0.6,
                COLOR_RAMP[2],
                0.65,
                COLOR_RAMP[3],
                0.7,
                COLOR_RAMP[4],
                0.75,
                COLOR_RAMP[5],
                0.8,
                COLOR_RAMP[6],
                0.85,
                COLOR_RAMP[7],
                0.9,
                COLOR_RAMP[8],
                0.95,
                COLOR_RAMP[9],
                1,
                COLOR_RAMP[10]
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
              required: true
            }
          ],
        },
      ]
    },
    provider: 'cartodb'
  };
};


export const vectorLayerCarto2 = (iso, opacity = 1) => {
  return {
    id: '0911abc4-546565-d861-4d7a-84d6-0fa07b51d7d8',
    name: 'Committee average',
    sqlParams: {
      where: {
        iso3: iso
      }
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval, b.species, b.scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid`
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
                transparent,
                0.05,
                transparent,
                0.15,
                transparent,
                0.2,
                transparent,
                0.25,
                transparent,
                0.3,
                transparent,
                0.35,
                transparent,
                0.4,
                transparent,
                0.45,
                transparent,
                0.5,
                COLOR_RAMP[0],
                0.55,
                COLOR_RAMP[1],
                0.6,
                COLOR_RAMP[2],
                0.65,
                COLOR_RAMP[3],
                0.7,
                COLOR_RAMP[4],
                0.75,
                COLOR_RAMP[5],
                0.8,
                COLOR_RAMP[6],
                0.85,
                COLOR_RAMP[7],
                0.9,
                COLOR_RAMP[8],
                0.95,
                COLOR_RAMP[9],
                1,
                COLOR_RAMP[10]
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
        }
      ]
    },
    provider: 'cartodb'
  };
};