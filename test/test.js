/* global describe, it */
'use strict';
global.expect = require('chai').expect;
global.Backbone = require('backbone');
global._ = require('underscore');
global.HAL = require('../src/Backbone.HATEOAS');
global.sinon = require('sinon');

require('./spec/model.js');
require('./spec/collection.js');
