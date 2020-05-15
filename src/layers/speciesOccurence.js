import { SPECIES_RAMP_COLORS } from 'constants.js';

// vector carto layer for species occurence data
export default ({ iso, species, opacity = 1, isVisible = true }) => {
  const visibility = isVisible ? 'visible' : 'none';

  return {
    id: `layer-species-occurence`,
    name: 'observed',
    type: 'vector',
    active: true,

    sqlParams: {
      where: {
        iso3: iso
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
              sql: `SELECT * FROM all_spp_occurence {{where}}`
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
          filter: ['==', 'species', species],
          paint: {
            'circle-color': SPECIES_RAMP_COLORS[2],
            'circle-opacity': opacity,
            'circle-radius': {
              stops: [
                [12, 2],
                [22, 180]
              ]
            }
          },
          layout: {
            visibility
          },
          'source-layer': 'layer0',
          type: 'circle'
        }
      ]
    }
  };
};
