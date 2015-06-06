'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('backbone'), require('underscore'));
    } else {
        root.Backbone.HAL = factory(root.Backbone, root._);
    }
})(this, function (Backbone, _) {
    var Links = {
        getEmbedded: function () {
            return this.embedded;
        },
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
            } else if (!_.isUndefined(this.links[rel])) {
                found = this.links[rel];
            }
            return found;
        }
    };
    var Model = Backbone.Model.extend(_.extend({
        constructor: function (attributes, options) {
            Model.__super__.constructor.call(this, this.parse(_.clone(attributes)), options);
        },
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
            if (self || this.id) {
                return false;
            } else {
                return true;
            }
        },
        toJSON: function () {
            var links = this.getLinks(),
                embedded = this.getEmbedded(),
                cloned;

            cloned = _.clone(this.attributes);
            if (!_.isEmpty(embedded)) {
                cloned._embedded = embedded;
            }
            if (!_.isEmpty(links)) {
                cloned._links = links;

            }
            return cloned;
        }

    }, Links));

    var Collection = Backbone.Collection.extend(_.extend({
        constructor: function (models, options) {
            if (!_.isArray(models)) {
                models = this.parse(_.clone(models));
            }
            Collection.__super__.constructor.call(this, models, options);
        },
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
                return Collection.__super__.url.call(this);
            }
        }
    }, Links));

    Backbone.HAL = {};
    Backbone.HAL.Model = Model;
    Backbone.HAL.Collection = Collection;
    return Backbone.HAL;
});
