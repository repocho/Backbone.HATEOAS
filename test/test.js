/* global describe, it */
'use strict';
global.expect = require('chai').expect;
global.HAL = require('../src/BackboneHATEOAS');
global.Backbone = require('backbone');
global._ = require('underscore');
global.sinon = require('sinon');

require('./spec/model.js');
require('./spec/collection.js');
