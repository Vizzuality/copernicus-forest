export default () => {
  return {
    type: 'raster',
    body: {
      url:
        'https://staging-api.globalforestwatch.org/v1/layer/77f8671c-5d56-4285-b841-570efbf341ea/tile/gee/{z}/{x}/{y}'
    },
    maxzoom: 18,
    minzoom: 3,
    params_config: [],
    sql_config: [],
    provider: 'mapbox'
  };
};
