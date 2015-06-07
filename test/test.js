/* global describe, it */
'use strict';
global.expect = require('chai').expect;
global.HAL = require('../src/BackboneHATEOAS');
global.Backbone = require('backbone');
global._ = require('underscore');
global.sinon = require('sinon');

require('./spec/model.js');
require('./spec/collection.js');

/*describe('test', function () {
    var model;
    var response = {
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
    };
    before(function () {
        sinon.stub(Backbone, 'ajax', function (options) {
            // assigns success callback to done.
            if (options.success) {
                options.success(_.clone(response));
            }
        });
    });
    after(function () {
        Backbone.ajax.restore();
    });

    it('fetching model instead of initialize', function () {

        model = new HAL.Model({
            _links: {
                self: {
                    href: 'http://customserver.com/api/resource/1'
                }
            }
        });
        model.fetch();
        // Check properties
        expect(model.attributes).to.be.an('object');
        expect(model.attributes).to.have.property('attributeOne', 'foo');
        expect(model.attributes).to.have.property('attributeTwo', 'bar');
        expect(model.get('attributeOne')).to.equal('foo');
        expect(model.get('attributeTwo')).to.equal('bar');

        // Check links
        expect(model.getLinks()).to.be.defined;
        expect(model.getLinks()).to.have.property('others');
        expect(model.getLinks()).to.have.property('self');
        expect(model.getLink('others')).to.be.defined;
        expect(model.getLink('self')).to.be.defined;

        var others = model.getLink('others');
        expect(others).is.an('array');
        expect(others).to.have.length(2);
        expect(others[0].href).to.equal('http://customserver.com/api/resource/2');
        expect(others[1].href).to.equal('http://customserver.com/api/resource/3');

        var self = model.getLink('self');
        expect(self).is.not.an('array');
        expect(self.href).to.equal('http://customserver.com/api/resource/1');

        // Check embedded properties
        expect(model.getEmbedded()).to.be.empty;
        expect(JSON.stringify(model.toJSON())).to.equal(JSON.stringify(response));
    });
});
*/
