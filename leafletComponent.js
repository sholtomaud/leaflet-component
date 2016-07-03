'use strict'

const crel = require('crel');
const laidout = require('laidout');
const L = require('leaflet');

const defaultMap = {
  zoomControl: false,
  center: [-23.0000, 146.62987],
  zoom: 5,
  minZoom: 4
}

module.exports = function(fastn, component, type, settings, children) {

  component.render = function(){
      component.element = crel('div', {class: 'map'});

      let leafletMap = component.map = L.map(component.element, defaultMap )

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
          .addTo(leafletMap);

      L.control.zoom({position: 'bottomright'})
          .addTo(leafletMap);


      laidout(component.element, function(){
          leafletMap.invalidateSize();
      });

      leafletMap.on('click', function(event){
          component.emit('click', event, component.scope())
      });

      leafletMap.on('dragend', function(event){
          component.emit('dragend', event, component.scope())
      });

      component.emit('render');
  };

  let bounds = [];
  component._insert = function( childElement ){
      if(!childElement || !component.map){
          return;
      }
      childElement.addTo(component.map);
      bounds.push([childElement._latlng.lat,childElement._latlng.lng]);
      component.map.fitBounds(bounds);
  };

  component._remove = function(childElement){
      if(!childElement || !component.map){
          return;
      }
      component.map.removeLayer(childElement);
      bounds.pop();
  };

    return component;
}
