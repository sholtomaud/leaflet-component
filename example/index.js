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
      latitude:-35.2834600	,
      longitude: 149.9,
      title: 'Hello fastn 1'
    },
    {
      latitude:-35.5	,
      longitude: 144.12,
      title: 'Hello fastn 2'
    },
    {
      latitude:-35.1	,
      longitude: 149.125,
      title: 'Hello fastn 3'
    },
    {
      latitude:-35.9	,
      longitude: 149.131,
      title: 'Hello fastn 4'
    }
]
})

const ui = fastn('div', {class:'map'},
  fastn('list:leaflet',{
    items: fastn.binding('markers').attach(markerModel),
    template: function(){
        return fastn('marker', {
            latitude: fastn.binding('latitude'),
            longitude: fastn.binding('longitude'),
            title: fastn.binding('title')
        }).binding('item')
    }
  })
)

window.addEventListener('load', function () {
  ui.attach().render()
  document.body.appendChild(ui.element)
})
