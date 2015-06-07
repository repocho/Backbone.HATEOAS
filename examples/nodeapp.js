'use strict';
/*
 * The require in a normal app should be
 * var HAL = require('Backbone.HATEOAS');
 */
var HAL = require('../src/BackboneHATEOAS.js');

var model = new HAL.Model({
    attributeOne: 'foo',
    attributeTwo: 'bar',
    _links: {
        others: [{
            href: 'http://customserver.com/api/resource/2'
        }, {
            href: 'http://customserver.com/api/resource/3'
        }],
        self: {
            href: 'http://customserver.com/api/resource/1'
        }
    }
});

console.log('Attributes:');
console.log(model.attributes);
console.log('------------');

console.log('Links:');
console.log(model.getLinks());
console.log('------------');

console.log('Embedded:');
console.log(model.getEmbedded());
console.log('------------');

console.log('To JSON:');
console.log(model.toJSON());
console.log('------------');
