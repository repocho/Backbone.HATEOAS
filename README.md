Backbone.HATEOAS [![Build Status](https://travis-ci.org/repocho/Backbone.HATEOAS.svg?branch=master)](https://travis-ci.org/repocho/Backbone.HATEOAS) [![Code Climate](https://codeclimate.com/github/repocho/Backbone.HATEOAS/badges/gpa.svg)](https://codeclimate.com/github/repocho/Backbone.HATEOAS) [![Test Coverage](https://codeclimate.com/github/repocho/Backbone.HATEOAS/badges/coverage.svg)](https://codeclimate.com/github/repocho/Backbone.HATEOAS/coverage)
===========
Adds to Backbone the possibility to interact with HATEOAS APIs.

Only available **HAL** implementation. Other implementations could be added in further updates.

## How to use this Backbone Extension?
This extension is created mainly to use it inside the **browser**. Should be the complement of a simple Backbone frontend application. It can be used with requirejs or other AMD loaders.
### Example of how it works
```javascript
HALModel = Backbone.HAL.Model.extend({});
var resource = new HALModel({
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
        }
    },
    _links: {
        self: {
            href: 'http://customserver.com/api/resource/1'
        }
    }
});

resource.get('attributeOne'); //=> "foo"
resource.get('attributeTwo'); //=> "bar"
resource.url();       //=> "http://customserver.com/api/resource/1"
resource.getLinks();  //=>  { self: { href: 'http://customserver.com/api/resource/1'}}
resource.links;       //=>  { self: { href: 'http://customserver.com/api/resource/1'}}
resource.getLink('self');  //=>  { href: 'http://customserver.com/api/resource/1'}
resource.getEmbedded();
    //=>    {
    //          items: {
    //              name: 'Item one',
    //              price: 22,
    //              _links: {
    //                  self: {
    //                      href: 'http://customserver.com/api/items/1'
    //                  }
    //              }
    //          }
    //      }
resource.get('_links');     //=> undefined
resource.get('_embedded');  //=> undefined
```
### Simple use
Place the file /src/**Backbone.HATEOAS.js** in a folder, for instance in the same folder as backbone library. (In the following example is */vendor/backbone/*)

Load Backbone.HATEOAS.js always at least after underscore and backbone.

The extension is placed in **Backbone.HAL**:
- Backbone.**HAL**.**Model**
- Backbone.**HAL**.**Collection**
```html
<script type="text/javascript" src='/vendor/underscore/underscore.js'></script>
<script type="text/javascript" src='/vendor/backbone/backbone.js'></script>
<script type="text/javascript" src="/vendor/backbone/Backbone.HATEOAS.js"></script>

<script type="text/javascript">
    HALModel = Backbone.HAL.Model.extend({
    });
    var model = new HALModel({});

    MyCollection = Backbone.HAL.Collection.extend({
    });
    var collection = new MyCollection({});
</script>
```

### Use as AMD Module
The module returns an object with Model and Collection
```javascript
require(['/vendor/backbone/Backbone.HATEOAS'], function(HAL){
    HALModel = HAL.Model.extend({
    });
    var model = new HALModel({});

    MyCollection = HAL.Collection.extend({
    });
    var collection = new MyCollection({});
});

//OR define
define(['/vendor/backbone/Backbone.HATEOAS'], function(HAL){
    HALModel = HAL.Model.extend({
    });
    var model = new HALModel({});

    MyCollection = HAL.Collection.extend({
    });
    var collection = new MyCollection({});
});
```

The extension is placed in **Backbone.HAL**:
- Backbone.**HAL**.**Model**
- Backbone.**HAL**.**Collection**

### Use as Nodejs Module
**INSTALL**
```bash
$ npm install --save backbone.hateoas
```

The module returns an object with Model and Collection
```javascript
var HAL = require('backbone.hateoas');

HALModel = HAL.Model.extend({});
var model = new HALModel({});

MyCollection = HAL.Collection.extend({});
var collection = new MyCollection({});
```

## What is HATEOAS
Definition: **Hypermedia as the Engine of Application State**

**HATEOAS** applied to REST interfaces provides the **mechanism to navigate** the site or API. Basically this is achieved by **including hypermedia links** with the **responses**. The clients could **discover** new paths or ways to interact with the REST interfaces.

###### References
- [Fielding, Roy T. (20 Oct 2008). "REST APIs must be hypertext-driven". Retrieved 20 May 2010.](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)
- [Wikipedia reference](http://en.wikipedia.org/wiki/HATEOAS)
- [Spring.io - Understanding HATEOAS](https://spring.io/understanding/HATEOAS)


## Test Code
To test this Backbone extension is working either from command line or browser.

### Command line
```bash
$ npm install -g mocha
$ npm install
$ mocha
```

### Browser
It's recommended to use last version of **Firefox** or **Chrome**.

Simply open the file ***test/spec-runner.html***
