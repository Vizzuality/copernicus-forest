export const vectorLayerCarto = iso => {
  return {
    id: '0911abc4-546565-d861-4d7a-84d6-0fa07b51d7d8',
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
        maxzoom: 19,
        minzoom: 2,
        vectorLayers: [
          {
            paint: {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'probabilityemca'],
                0,
                '#7FBF7B',
                0.05,
                '#8DC689',
                0.15,
                '#9BCD98',
                0.2,
                '#A9D4A7',
                0.25,
                '#B7DBB5',
                0.3,
                '#C6E2C4',
                0.35,
                '#D4E9D3',
                0.4,
                '#E2F0E1',
                0.45,
                '#F0F7F0',
                0.5,
                '#FFFFFF',
                0.55,
                '#F0ECFF',
                0.6,
                '#E2D9FF',
                0.65,
                '#D4C6FF',
                0.7,
                '#C5B4FF',
                0.75,
                '#B7A1FF',
                0.8,
                '#A98EFF',
                0.85,
                '#9A7CFF',
                0.9,
                '#8C69FF',
                0.95,
                '#7E56FF',
                1,
                '#7044FF'
              ],
              'fill-opacity': 1
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
