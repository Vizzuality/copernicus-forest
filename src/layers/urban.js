export default () => {
  return {
    id: "asdsadsadsadsadasd",
    type: "raster",
    // attributes: {
    name: "Tree cover gain - 2001-2012",
    // slug: "Tree-Cover-Gain",
    // dataset: "70e2549c-d722-44a6-a8d7-4a385d78565e",
    // description: "Identifies areas of tree cover gain.",
    // application: [
    //   "gfw"
    // ],
    // iso: [ ],
    provider: "gee",
    userId: "59db4eace9c1380001d6e4c3",
    default: false,
    protected: false,
    published: true,
    // env: "production",
    layerConfig: {
      body: {
        format: "image/png",
        maxNativeZoom: 12,
        maxzoom: 19,
        minNativeZoom: 3,
        minzoom: 2,
        useCors: true
      },
      params_config: [ ],
      service: "gee",
      type: "tileLayer",
      url: "https://storage.cloud.google.com/forest-forward/tilesets/urbanWorld/{z}/{x}/{y}.png?authuser=1"
    },
    "maxzoom": 18,
    "minzoom": 3,
    "params_config": [],
    "sql_config": []
    // legendConfig: {
    //   items: [
    //     {
    //       color: "#4600ff",
    //       source: "(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)",
    //       name: "Tree cover gain"
    //     }
    //   ],
    //   type: "basic"
    // },
    // interactionConfig: { },
    // applicationConfig: {
    //   active: true,
    //   // analysisConfig: [
    //   //   {
    //   //     key: "gain",
    //   //     service: "umd-loss-gain",
    //   //     type: "geostore",
    //   //     unit: "ha",
    //   //     version: "v1"
    //   //   },
    //   //   {
    //   //     key: "totals",
    //   //     service: "umd-loss-gain",
    //   //     subKey: "gain",
    //   //     type: "admin",
    //   //     unit: "ha",
    //   //     version: "v3"
    //   //   }
    //   // ],
    //   default: true,
    //   global: true,
    //   metadata: "tree_cover_gain",
    //   menuPosition: 1
    // },
    // staticImageConfig: { },
    // createdAt: "2019-12-04T12:19:29.581Z",
    // updatedAt: "2019-03-11T18:05:30.228Z"
    }
  // }
}