/* global describe, it, expect,beforeEach, HAL */
'use strict';
/*jshint -W030 */

describe(
    'HAL.Collection',
    function () {
        var response = {
            _links: {
                self: {
                    href: '/example'
                },
                egg: {
                    href: '/boo'
                }
            },
            _embedded: {
                items: [{
                    _links: {
                        self: {
                            href: '/item1'
                        }
                    },
                    _embedded: {
                        emb: {
                            _links: {
                                self: {
                                    href: '/foo'
                                }
                            }
                        }
                    },
                    itemAttribute: 'foo'
                }, {
                    _links: {
                        self: {
                            href: '/item2'
                        }
                    },
                    itemAttribute: 'foo'
                }, {
                    _links: {
                        self: {
                            href: '/item3'
                        }
                    },
                    itemAttribute: 'foo'
                }]
            },
            attribute: 'val',
            otherAttribute: 'val2'
        };
        describe('initialize', function () {
            var collection;
            beforeEach(function () {
                collection = new HAL.Collection(response);
            });

            it('no parameters', function () {

                var collection = new HAL.Collection();
                expect(collection.get('_links') || collection.get('_embedded')).to.be.undefined;
                expect(collection).to.be.defined;
                expect(collection.attributes).to.be.empty;
            });

            it('check _links and _embedded properties removed', function () {
                expect(collection.get('_links') || collection.get('_embedded')).to.be.undefined;
            });

            it('getting url ', function () {
                expect(collection.url()).to.equal(response._links.self.href);
            });
            it('sets links property of instance correctly', function () {
                expect(collection.getLinks()).to.equal(response._links);
            });
            it('sets embedded property of instance correctly', function () {
                expect(collection.getEmbedded()).to.equal(response._embedded);
            });
            it('sets normal properties up as expected', function () {
                expect(collection.attributes.attribute).to.equal(response.attribute);
                expect(collection.attributes.otherAttribute).to.equal(response.otherAttribute);
            });

        });

        describe('fetch', function () {
            var collection;
            beforeEach(function () {
                sinon.stub(Backbone, 'ajax', function (options) {
                    // assigns success callback to done.
                    if (options.success) {
                        options.success(_.clone(response));
                    }
                });
                collection = new HAL.Collection({
                    _links: {
                        self: {
                            href: '/example'
                        }
                    }
                });
                collection.fetch();
            });
            afterEach(function () {
                Backbone.ajax.restore();
            });

            it('check _links and _embedded properties removed', function () {
                expect(collection.get('_links') || collection.get('_embedded')).to.be.undefined;
            });

            it('getting url ', function () {
                expect(collection.url()).to.equal(response._links.self.href);
            });
            it('sets links property of instance correctly', function () {
                expect(collection.getLinks()).to.equal(response._links);
            });
            it('sets embedded property of instance correctly', function () {
                expect(collection.getEmbedded()).to.equal(response._embedded);
            });
            it('sets normal properties up as expected', function () {
                expect(collection.attributes.attribute).to.equal(response.attribute);
                expect(collection.attributes.otherAttribute).to.equal(response.otherAttribute);
            });
        });

    }
);
