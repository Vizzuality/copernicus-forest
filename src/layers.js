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

export const BIOCLIMATIC_COLOR_RAMP = [
  '#FEF6B5',
  '#FEEEAF',
  '#FEE6A9',
  '#FEDEA3',
  '#FED69D',
  '#FECE97',
  '#FEC691',
  '#FEBE8B',
  '#FEB685',
  '#FEAE7F',
  '#FFA679',
  '#FB9C7A',
  '#F8937B',
  '#F58A7C',
  '#F1817D',
  '#EE777E',
  '#EB6E7F',
  '#E76580',
  '#E45C81',
  '#E15383'
];

const transparent = 'rgba(255, 255, 255, 0)';

export const vectorLayerCarto = (iso, species, scenario, year, opacity = 1) => {
  return {
    id: `${iso}${species}${scenario}${year}`,
    name: 'Committee average',
    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        species,
        scenario
      }
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval as year, b.species, b.scenario, b.probabilityemca FROM ${iso.toLowerCase()}_zonal_spp_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
            },
            type: 'cartodb'
          }
        ],
        maxzoom: 3,
        minzoom: 2,
        vectorLayers: [
          {
            filter: ['==', 'year', year],
            paint: {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'probabilityemca'],
                0,
                transparent,
                0.5,
                '#FFFFFF',
                1,
                '#7044FF'
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
          ]
        }
      ]
    },
    provider: 'cartodb'
  };
};

export const currentDistributionCartoLayer = (iso, species, opacity = 1) => {
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
                transparent,
                0.5,
                '#FFFFFF',
                1,
                '#7044FF'
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
