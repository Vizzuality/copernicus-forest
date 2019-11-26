// vector carto layer for bioclimatic variables data
export default (iso, scenario, biovar, year, opacity = 1, buckets, rampColors) => {
  return {
    id: `${iso}${scenario}${biovar}`,
    name: 'Bioclimatic layer',
    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        scenario,
        biovar
      }
    },
    layerConfig: {
      account: 'simbiotica',
      body: {
        layers: [
          {
            options: {
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval as year, b.biovar, b.scenario, b.wieghtedmean FROM ${iso.toLowerCase()}_zonal_bv_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
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
                ['get', 'wieghtedmean'],
                buckets[0],
                rampColors[0],
                buckets[1],
                rampColors[1],
                buckets[2],
                rampColors[2]
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
              key: 'scenario',
              required: true
            },
            {
              key: 'biovar',
              required: true
            }
          ]
        }
      ]
    },
    provider: 'cartodb'
  };
};
