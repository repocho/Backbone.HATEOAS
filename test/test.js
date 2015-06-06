/* global describe, it */
'use strict';
global.expect = require('chai').expect;
global.HAL = require('../src/BackboneHATEOAS');
require('./spec/model.js');
require('./spec/collection.js');
