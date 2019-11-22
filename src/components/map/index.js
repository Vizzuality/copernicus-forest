/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Component from './component';
import isEmpty from 'lodash/isEmpty';

import { FlyToInterpolator, TRANSITION_EVENTS } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { easeCubic } from 'd3-ease';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = props => {
  const [flying, setFlying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const flyToInterpolator = new FlyToInterpolator();

  // const changeLayerProperty = (id, propertyName, value) => {
  //   const { changeLayerProperty } = props;
  //   map.setPaintProperty(id, propertyName, value)
  // }

  const onLoad = () => {
    const { bounds, onLoad } = props;
    setLoaded(true);

    if (!isEmpty(bounds) && !!bounds.bbox) {
      fitBounds();
    }

    onLoad({
      map: mapRef.current.getMap(),
      mapContainer: mapContainerRef
    });
  };

  const onViewportChange = (v, interactionState) => {
    const { onViewportChange, setViewport } = props;
    if (
      (loaded && interactionState && !interactionState.inTransition) ||
      (loaded && !interactionState)
    ) {
      onViewportChange(v);
      if (setViewport) {
        setViewport(v);
      }
    }
  };

  const onResize = v => {
    const { onViewportChange, viewport } = props;
    const newViewport = {
      ...viewport,
      ...v
    };

    onViewportChange(newViewport);
  };

  const fitBounds = () => {
    const { bounds, onViewportChange, viewport } = props;
    const { bbox, options } = bounds;

    const v = {
      width: mapContainer.offsetWidth,
      height: mapContainer.offsetHeight,
      ...viewport
    };

    const { longitude, latitude, zoom } = new WebMercatorViewport(v).fitBounds(
      [[bbox[0], bbox[1]], [bbox[2], bbox[3]]],
      options
    );

    const newViewport = {
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 2500,
      transitionInterruption: TRANSITION_EVENTS.UPDATE
    };

    setFlying(true);
    onViewportChange(newViewport);

    setTimeout(() => setFlying(false), 2500);
  };

  const {
    customClass,
    children,
    getCursor,
    dragPan,
    dragRotate,
    scrollZoom,
    touchZoom,
    touchRotate,
    doubleClickZoom
  } = props;

  return (
    <Component
      {...props}
      mapContainerRef={mapContainerRef}
      mapRef={mapRef}
      dragPan={!flying && dragPan}
      dragRotate={!flying && dragRotate}
      scrollZoom={!flying && scrollZoom}
      touchZoom={!flying && touchZoom}
      touchRotate={!flying && touchRotate}
      doubleClickZoom={!flying && doubleClickZoom}
      // DEFAULT FUNC IMPLEMENTATIONS
      onViewportChange={onViewportChange}
      onResize={onResize}
      onLoad={onLoad}
      getCursor={getCursor}
      transitionInterpolator={flyToInterpolator}
      transitionEasing={easeCubic}
      loaded={loaded}
    />
  );
};

MapComponent.propTypes = {
  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
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
