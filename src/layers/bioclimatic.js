import flatten from 'lodash/flatten';
import chroma from 'chroma-js';
// vector carto layer for bioclimatic variables data
export default ({ iso, scenario, biovar, year, opacity = 1, buckets, rampColors }) => {
  const colors = chroma.scale(rampColors).colors(buckets.length);
  return {
    id: `layer-bioclimatic`,
    name: 'Bioclimatic layer',
    type: 'vector',
    active: true,

    sqlParams: {
      where: {
        iso3: iso
      },
      where2: {
        biovar,
        scenario
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
              sql: `WITH a AS (SELECT cartodb_id, the_geom_webmercator, uuid, iso3 FROM all_geometry {{where}}) SELECT a.the_geom_webmercator, a.cartodb_id, b.uuid, b.timeinterval as year, b.biovar, b.scenario, b.wieghtedmean FROM ${iso.toLowerCase()}_zonal_bv_uuid as b INNER JOIN a ON b.uuid = a.uuid {{where2}}`
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
          filter: ['==', 'year', year],
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'wieghtedmean'],
              ...flatten(buckets.map((b, i) => [b, colors[i]]))
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
