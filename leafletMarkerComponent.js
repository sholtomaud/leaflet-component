'use strict'

const L = require('leaflet');

module.exports = function(fastn, component, type, settings, children) {

    component.render = function(){
        L.Icon.Default.imagePath = 'markers';

        component.element = L.marker([
            component.gis_lat(),
            component.gis_lng()
        ], {
            clickable: true,
            title: component.title()
        });

        component.element.on('click', function(event){
            component.emit('click', event, component.scope())
        });
    };

    function updatePosition(){
        if(!component.element){
            return;
        }

        component.element.setLatLng([
            component.gis_lat(),
            component.gis_lng()
        ]);
    }

    function updateTitle(){
        if(!component.element){
            return;
        }

        component.element.setTitle([
            component.title()
        ]);
    }

    function updateType(){
        if(!component.element){
            return;
        }

        component.element.setType([
            component.type()
        ]);
    }

    function updateStatus(){
        if(!component.element){
            return;
        }

        component.element.setStatus([
            component.status()
        ]);
    }

    fastn.property(0, 'value')
        .addTo(component, 'gis_lat')
        .on('change', updatePosition);

    fastn.property(0, 'value')
        .addTo(component, 'gis_lng')
        .on('change', updatePosition);

    fastn.property(0, 'value')
        .addTo(component, 'title')
        .on('change', updateTitle);

    fastn.property(0, 'value')
        .addTo(component, 'type')
        .on('change', updateType);

    fastn.property(0, 'value')
        .addTo(component, 'status')
        .on('change', updateStatus);

    return component;
}
