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

export const bioclimaticLayerCarto = (iso, scenario, biovar, year, opacity = 1, buckets) => {
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
                '#FEF6B5',
                buckets[1],
                '#FEAE7F',
                buckets[2],
                '#E15383'
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
