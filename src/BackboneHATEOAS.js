'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('backbone'), require('underscore'));
    } else {
        root.myModule = factory(root.postal);
    }
})(this, function (Backbone, _) {
    var Links = {
        getLinks: function () {
            return this.links;
        },
        getLink: function (rel) {
            var found;
            if (_.isArray(this.links)) {
                found = _.where(this.links, {
                    rel: rel
                });
                if (found.length === 1) {
                    found = found[0];
                }
            } else {
                found = this.links[rel];
            }
            return found;
        }
    };
    var Model = Backbone.Model.extend({
        parse: function (attributes) {
            attributes = attributes || {};
            this.links = attributes._links || {};
            delete attributes._links;
            this.embedded = attributes._embedded || {};
            delete attributes._embedded;
            return attributes;
        },
        url: function () {
            var self = this.getLink('self');
            if (self) {
                return self.href;
            } else {
                return Model.__super__.url.call(this);
            }
        },
        isNew: function () {
            var self = this.getLink('self');
            if (self) {
                return false;
            } else {
                return true;
            }
        }
    });
    var Collection = Backbone.Collection.extend({
        parse: function (object) {
            object = object || {};
            this.links = object._links || {};
            delete object._links;
            this.embedded = object._embedded || {};
            delete object._embedded;
            this.attributes = object || {};
            return this.embedded.items;
        },
        reset: function (obj, options) {
            options = options || {};
            delete this.links;
            if (!_.isArray(obj)) {
                obj = this.parse(_.clone(obj));
            }
            options.parse = false;
            return Collection.__super__.reset.call(this, obj, options);
        },
        url: function () {
            var self = this.getLink('self');
            if (self) {
                return self.href;
            } else {
                return Model.__super__.url.call(this);
            }
        }
    });
    Model.prototype = _.extend(Model.prototype, Links);
    Collection.prototype = _.extend(Collection.prototype, Links);
    Backbone.HAL = {};
    Backbone.HAL.Model = Model;
    Backbone.HAL.Collection = Collection;
});
