var fastn = require('fastn')({
  _generic: require('fastn/genericComponent'),
  list: require('fastn/listComponent'),
  templater: require('fastn/templaterComponent'),
  text: require('fastn/textComponent'),
	leaflet: require('./leafletComponent'),
	marker: require('./leafletMarkerComponent')
})

module.exports = function (settings) {
  return fastn('leaflet', settings).attach().render()
}
