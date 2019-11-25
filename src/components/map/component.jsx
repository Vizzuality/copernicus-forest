/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import { MAPBOX_STYLE_DEFAULT } from 'constants.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

const DEFAULT_VIEWPORT = {
  zoom: 2,
  lat: 0,
  lng: 0
};

const MapComponent = props => {
  const {
    customClass,
    children,
    getCursor,
    dragPan,
    dragRotate,
    scrollZoom,
    touchZoom,
    touchRotate,
    doubleClickZoom,
    viewport,
    mapRef,
    mapContainerRef,
    onViewportChange,
    onResize,
    onLoad,
    flyToInterpolator,
    easeCubic,
    loaded,
    ...mapboxProps
  } = props;
  const map = mapRef && mapRef.current && mapRef.current.getMap();
  return (
    <div
      ref={mapContainerRef}
      className={classnames({
        'c-map': true,
        [customClass]: !!customClass
      })}
    >
      <ReactMapGL
        ref={mapRef}
        // CUSTOM PROPS FROM REACT MAPBOX API
        {...mapboxProps}
        mapStyle={MAPBOX_STYLE_DEFAULT}
        mapboxApiAccessToken={process.env.react_app_mapbox_token}
        // VIEWPORT
        {...viewport}
        width="100%"
        height="100%"
        // INTERACTIVE
        dragPan={dragPan}
        dragRotate={dragRotate}
        scrollZoom={scrollZoom}
        touchZoom={touchZoom}
        touchRotate={touchRotate}
        doubleClickZoom={doubleClickZoom}
        // DEFAULT FUNC IMPLEMENTATIONS
        onViewportChange={onViewportChange}
        onResize={onResize}
        onLoad={onLoad}
        getCursor={getCursor}
        transitionInterpolator={flyToInterpolator}
        transitionEasing={easeCubic}
      >
        {loaded && !!map && typeof children === 'function' && children(map)}
      </ReactMapGL>
    </div>
  );
};

MapComponent.propTypes = {
  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
  viewport: PropTypes.shape({}),

  children: PropTypes.func /** A function that returns the map instance */,
  customClass: PropTypes.string /** Custom css class for styling */,
  bounds: PropTypes.shape({
    /** An object that defines the bounds */
    bbox: PropTypes.array,
    options: PropTypes.shape({})
  }),
  dragPan: PropTypes.bool /** A boolean that allows panning */,
  dragRotate: PropTypes.bool /** A boolean that allows rotating */,
  scrollZoom: PropTypes.bool /** A boolean that allows zooming */,
  touchZoom: PropTypes.bool /** A boolean that allows zooming */,
  touchRotate: PropTypes.bool /** A boolean that allows touch rotating */,
  doubleClickZoom: PropTypes.bool /** A boolean that allows double click zooming */,
  onLoad:
    PropTypes.func /** A function that exposes when the map is loaded. It returns and object with the `this.map` and `this.mapContainer` reference. */,
  onViewportChange: PropTypes.func /** A function that exposes the viewport */,
  getCursor: PropTypes.func /** A function that exposes the viewport */
};

MapComponent.defaultProps = {
  children: null,
  customClass: null,
  viewport: DEFAULT_VIEWPORT,
  bounds: {},
  dragPan: true,
  dragRotate: true,
  onViewportChange: () => {},
  onLoad: () => {},
  getCursor: ({ isHovering, isDragging }) => {
    if (isHovering) return 'pointer';
    if (isDragging) return 'grabbing';
    return 'grab';
  }
};

export default MapComponent;

// /* eslint-disable */
// import React, { PureComponent } from 'react';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';

// import isEqual from 'lodash/isEqual';
// import isEmpty from 'lodash/isEmpty';

// import ReactMapGL, { FlyToInterpolator, TRANSITION_EVENTS } from 'react-map-gl';
// import WebMercatorViewport from 'viewport-mercator-project';
// import { easeCubic } from 'd3-ease';

// import 'mapbox-gl/dist/mapbox-gl.css';
// import './styles.scss';

// const DEFAULT_VIEWPORT = {
//   zoom: 2,
//   lat: 0,
//   lng: 0
// };

// class MapComponent extends PureComponent {
//   constructor(props) {
//     super(props);
//     // events = {};
//     this.state = {
//       flying: false,
//       loaded: false
//     };
//   }

//   getMapContainerRef = ref => {
//     this.mapContainer = ref;
//   };

//   getMapRef = ref => {
//     if (ref) {
//       this.map = ref.getMap();
//     }
//   };

//   flyToInterpolator = new FlyToInterpolator();

//   changeLayerProperty = (id, propertyName, value) => {
//     const { changeLayerProperty } = this.props;
//     this.map.setPaintProperty(id, propertyName, value)
//   }

//   onLoad = () => {
//     const { bounds, onLoad } = this.props;
//     this.setState({ loaded: true });

//     if (!isEmpty(bounds) && !!bounds.bbox) {
//       this.fitBounds();
//     }

//     onLoad({
//       map: this.map,
//       mapContainer: this.mapContainer
//     });
//   };

//   onViewportChange = (v, interactionState) => {
//     const { onViewportChange, setViewport } = this.props;
//     const { loaded } = this.state;
//     if (
//       (loaded && interactionState && !interactionState.inTransition) ||
//       (loaded && !interactionState)
//     ) {
//       onViewportChange(v);
//       if (setViewport) {
//         setViewport(v);
//       }
//     }
//   };

//   onResize = v => {
//     const { onViewportChange, viewport } = this.props;
//     const newViewport = {
//       ...viewport,
//       ...v
//     };

//     onViewportChange(newViewport);
//   };

//   fitBounds = () => {
//     const { bounds, onViewportChange, viewport } = this.props;
//     const { bbox, options } = bounds;

//     const v = {
//       width: this.mapContainer.offsetWidth,
//       height: this.mapContainer.offsetHeight,
//       ...viewport
//     };

//     const { longitude, latitude, zoom } = new WebMercatorViewport(v).fitBounds(
//       [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
//       options
//     );

//     const newViewport = {
//       ...viewport,
//       longitude,
//       latitude,
//       zoom,
//       transitionDuration: 2500,
//       transitionInterruption: TRANSITION_EVENTS.UPDATE
//     };

//     this.setState({
//       flying: true
//     });
//     onViewportChange(newViewport);

//     setTimeout(() => {
//       this.setState({ flying: false });
//     }, 2500);
//   };

//   render() {
//     const {
//       customClass,
//       children,
//       getCursor,
//       dragPan,
//       dragRotate,
//       scrollZoom,
//       touchZoom,
//       touchRotate,
//       doubleClickZoom,
//       viewport,
//       ...mapboxProps
//     } = this.props;
//     const { loaded, flying } = this.state;

//     return (
//       <div
//         ref={this.getMapContainerRef}
//         className={classnames({
//           'c-map': true,
//           [customClass]: !!customClass
//         })}
//       >
//         <ReactMapGL
//           ref={this.getMapRef}
//           // CUSTOM PROPS FROM REACT MAPBOX API
//           {...mapboxProps}
//           // VIEWPORT
//           {...viewport}
//           width="100%"
//           height="100%"
//           // INTERACTIVE
//           dragPan={!flying && dragPan}
//           dragRotate={!flying && dragRotate}
//           scrollZoom={!flying && scrollZoom}
//           touchZoom={!flying && touchZoom}
//           touchRotate={!flying && touchRotate}
//           doubleClickZoom={!flying && doubleClickZoom}
//           // DEFAULT FUNC IMPLEMENTATIONS
//           onViewportChange={this.onViewportChange}
//           onResize={this.onResize}
//           onLoad={this.onLoad}
//           // getCursor={getCursor}

//           transitionInterpolator={this.flyToInterpolator}
//           transitionEasing={easeCubic}
//         >
//           {loaded && !!this.map && typeof children === 'function' && children(this.map)}
//         </ReactMapGL>
//       </div>
//     );
//   }
// }

// MapComponent.propTypes = {
//   /** An object that defines the viewport
//    * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
//    */
//   viewport: PropTypes.shape({}),

//   children: PropTypes.func /** A function that returns the map instance */,
//   customClass: PropTypes.string /** Custom css class for styling */,
//   bounds: PropTypes.shape({
//     /** An object that defines the bounds */
//     bbox: PropTypes.array,
//     options: PropTypes.shape({})
//   }),
//   dragPan: PropTypes.bool /** A boolean that allows panning */,
//   dragRotate: PropTypes.bool /** A boolean that allows rotating */,
//   scrollZoom: PropTypes.bool /** A boolean that allows zooming */,
//   touchZoom: PropTypes.bool /** A boolean that allows zooming */,
//   touchRotate: PropTypes.bool /** A boolean that allows touch rotating */,
//   doubleClickZoom: PropTypes.bool /** A boolean that allows double click zooming */,
//   onLoad:
//     PropTypes.func /** A function that exposes when the map is loaded. It returns and object with the `this.map` and `this.mapContainer` reference. */,
//   onViewportChange: PropTypes.func /** A function that exposes the viewport */,
//   getCursor: PropTypes.func /** A function that exposes the viewport */
// };

// MapComponent.defaultProps = {
//   children: null,
//   customClass: null,
//   viewport: DEFAULT_VIEWPORT,
//   bounds: {},
//   dragPan: true,
//   dragRotate: true,
//   onViewportChange: () => {},
//   onLoad: () => {},
//   getCursor: ({ isHovering, isDragging }) => {
//     if (isHovering) return 'pointer';
//     if (isDragging) return 'grabbing';
//     return 'grab';
//   }
// };

// export default MapComponent;
