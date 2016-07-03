'use strict'

const fastn = require('fastn')({
  _generic: require('fastn/genericComponent'),
  templater: require('fastn/templaterComponent'),
  list: require('fastn/listComponent'),
  text: require('fastn/textComponent'),
  leaflet: require('../leafletComponent'),
  marker: require('../leafletMarkerComponent')
}, true)

let markerModel = new fastn.Model({
  markers : [
    {
      gis_lat:-35.2834600	,
      gis_lng: 149.9,
      title: 'Hello fastn 1'
    },
    {
      gis_lat:-35.5	,
      gis_lng: 144.12,
      title: 'Hello fastn 2'
    },
    {
      gis_lat:-35.1	,
      gis_lng: 149.125,
      title: 'Hello fastn 3'
    },
    {
      gis_lat:-35.9	,
      gis_lng: 149.131,
      title: 'Hello fastn 4'
    }
]
})

const ui = fastn('div', {class:'map'},
  fastn('list:leaflet',{
    items: fastn.binding('markers').attach(markerModel),
    template: function(){
        return fastn('base:marker', {
            gis_lat: fastn.binding('gis_lat'),
            gis_lng: fastn.binding('gis_lng'),
            title: fastn.binding('title')
        }).binding('item')
    }
  })
)

window.addEventListener('load', function () {
  ui.attach().render()
  document.body.appendChild(ui.element)
})
