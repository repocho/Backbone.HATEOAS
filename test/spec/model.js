/* global describe, it, expect, HAL */
'use strict';
/*jshint -W030 */

describe(
    'HAL.Model',
    function () {

        describe('initialize', function () {

            it('no parameters', function () {
                var model = new HAL.Model();

                expect(model.attributes).to.be.an('object');
                expect(model.attributes).to.be.empty;
                expect(model.getLinks()).to.be.empty;
                expect(model.getEmbedded()).to.be.empty;
            });

            it('simple attributes, no links or _embedded', function () {

                var model = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar'
                });

                // Check properties
                expect(model.attributes).to.be.an('object');
                expect(model.attributes).to.have.property('attributeOne', 'foo');
                expect(model.attributes).to.have.property('attributeTwo', 'bar');
                expect(model.get('attributeOne')).to.equal('foo');
                expect(model.get('attributeTwo')).to.equal('bar');

                expect(model.getLinks()).to.be.empty;
                expect(model.getEmbedded()).to.be.empty;

            });

            it('simple attributes and links, no _embedded', function () {

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

            });

            it('simple attributes and _embedded, no links ', function () {

                var model = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar',
                    _embedded: {
                        items: {
                            name: 'Item one',
                            price: 22,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/items/1'
                                }
                            }
                        },
                        others: [{
                            attributeOne: 'FooBAR',
                            attributeTwo: 'BARFoo',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/2'
                                }
                            }
                        }, {
                            attributeOne: 'XXXX',
                            attributeTwo: 'YYYY',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/3'
                                }
                            }
                        }],
                        toys: {
                            count: 3,
                            total: 12,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=2'
                                },
                                first: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                prev: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                next: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=3'
                                },
                                last: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=4'
                                }
                            }
                        }
                    }
                });

                // Check properties
                expect(model.attributes).to.be.an('object');
                expect(model.attributes).to.have.property('attributeOne', 'foo');
                expect(model.attributes).to.have.property('attributeTwo', 'bar');
                expect(model.get('attributeOne')).to.equal('foo');
                expect(model.get('attributeTwo')).to.equal('bar');

                // Check links
                expect(model.getLinks()).to.be.defined;

                // Check embedded properties
                expect(model.getEmbedded()).to.be.defined;

            });

        });

        describe('toJSON', function () {

            it('simple object, no links and embedded', function () {

                var obj = {
                    attributeOne: 'foo',
                    attributeTwo: 'bar'
                };

                var resource = new HAL.Model(obj);

                expect(JSON.stringify(resource.toJSON())).to.equal(JSON.stringify(obj));

            });

            it('simple object and links, no embedded', function () {

                var obj = {
                    attributeOne: 'foo',
                    attributeTwo: 'bar',
                    _links: {
                        self: {
                            href: 'http://customserver.com/api/resource/1'
                        }
                    }
                };

                var resource = new HAL.Model(obj);
                expect(JSON.stringify(resource.toJSON())).to.equal(JSON.stringify(obj));

            });

            it('complex object and embedded, no links', function () {

                var obj = {
                    attributeOne: 'foo',
                    attributeTwo: 'bar',
                    _embedded: {
                        items: {
                            name: 'Item one',
                            price: 22,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/items/1'
                                }
                            }
                        },
                        others: [{
                            attributeOne: 'FooBAR',
                            attributeTwo: 'BARFoo',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/2'
                                }
                            }
                        }, {
                            attributeOne: 'XXXX',
                            attributeTwo: 'YYYY',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/3'
                                }
                            }
                        }],
                        toys: {
                            count: 3,
                            total: 12,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=2'
                                },
                                first: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                prev: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                next: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=3'
                                },
                                last: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=4'
                                }
                            }
                        }
                    }
                };
                var resource = new HAL.Model(obj);

                expect(JSON.stringify(resource.toJSON())).to.equal(JSON.stringify(obj));

            });

            it('complex object, links and embedded', function () {
                var obj = {
                    attributeOne: 'foo',
                    attributeTwo: 'bar',
                    _embedded: {
                        items: {
                            name: 'Item one',
                            price: 22,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/items/1'
                                }
                            }
                        },
                        others: [{
                            attributeOne: 'FooBAR',
                            attributeTwo: 'BARFoo',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/2'
                                }
                            }
                        }, {
                            attributeOne: 'XXXX',
                            attributeTwo: 'YYYY',
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/3'
                                }
                            }
                        }],
                        toys: {
                            count: 3,
                            total: 12,
                            _links: {
                                self: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=2'
                                },
                                first: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                prev: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=1'
                                },
                                next: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=3'
                                },
                                last: {
                                    href: 'http://customserver.com/api/resource/1/toys?page=4'
                                }
                            }
                        }
                    },
                    _links: {
                        self: {
                            href: 'http://customserver.com/api/resource/1'
                        }
                    }
                };
                var resource = new HAL.Model(obj);

                expect(JSON.stringify(resource.toJSON())).to.equal(JSON.stringify(obj));

            });

        });

        describe('url', function () {

            it('valid self link and href', function () {

                var resources = new HAL.Collection();
                resources.url = 'https://notusedserver.com';

                var resource = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar',
                    _links: {
                        self: {
                            href: 'http://customserver.com/api/resource/1'
                        }
                    }
                }, {
                    collection: resources
                });
                resource.set('id', 98749);
                resource.urlRoot = 'https://lol3.com';

                expect(resource.url()).to.equal('http://customserver.com/api/resource/1');

            });

            it('no self link but urlRoot', function () {

                var resource = new HAL.Collection();
                resource.url = 'https://notusedserver.com';

                var user = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar'
                }, {
                    collection: resource
                });
                user.set({
                    'id': 1
                });
                user.urlRoot = 'http://customserver.com/api/resource';

                expect(user.url()).to.equal('http://customserver.com/api/resource/1');

            });

            it('no self link and `urlRoot` but an attached collection', function () {

                var resource = new HAL.Collection();
                resource.url = 'http://customserver.com/api/resource';

                var user = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar'
                }, {
                    collection: resource
                });
                user.set('id', 1);

                expect(user.url()).to.equal('http://customserver.com/api/resource/1');

            });

            it('no link, urlRoot and collection', function () {

                var user = new HAL.Model({
                    attributeOne: 'foo',
                    attributeTwo: 'bar'
                });

                expect(function () {
                    user.url();
                }).to.throw(Error, 'A "url" property or function must be specified');

            });

        });

    }
);
