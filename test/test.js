/* global describe, it */
'use strict';
global.expect = require('chai').expect;
global.Backbone = require('backbone');
global._ = require('underscore');
global.HAL = require('../src/BackboneHATEOAS');
global.sinon = require('sinon');

require('./spec/model.js');
require('./spec/collection.js');
