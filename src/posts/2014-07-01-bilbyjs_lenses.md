---
title: bilby.js & lenses
tags:
   - bilby.js
   - immutability
   - javascript
   - functional programming
date: July 1, 2014
---

# bilby.js & lenses

In JavaScript nearly everything is [mutable](http://en.wikipedia.org/wiki/Mutable). This can cause problems in your code when you think you have a new object or variable but instead you are operating on the referenced object. So, we create patterns to alleviate this problem. Or we use libraries like [underscore.js](http://underscorejs.org/) or [lodash.js](http://lodash.com/docs) which incorporate the functional concepts. Unfortunately they don't always use immutable objects either.

Bilby.js solves the mutability problem by using [lenses](http://bilby.brianmckenna.org/#lenses). Using the [lenses](http://en.wikipedia.org/wiki/Bidirectional_transformation) pattern one can access and change one's objects in a safe and immutable manner.

Let's say we have the `Person` object.

```javascript
function Person(){
   this.name = {first: 'George', last: 'Stanza'}
   this.id = 0
}
```

We use bilby.js lenses by first creating lens objects.

```javascript
var nameLens = bilby.objectLens('name')
var firstLens = bilby.objectLens('first')
var lastLens = bilby.objectLens('last')
var idLens = bilby.objectLens('id')
```

We then can use getters to access the data.

```javascript
var george = new Person()
// Person {name: {first:'George', last: 'Stanza'}, id: 0}
firstLens.compose(nameLens).run(george).getter
//George
lastLens.compose(nameLens).run(george).getter
//Stanza
idLens.run(george).getter
//0
```

Or you can create a get function.

```javascript
var get = function(lens, obj){
   return lens.run(obj).getter
}
// e.g.,
get(firstLens.compose(nameLens), george)
// George
```

To create a new object with new values from another object.

```javascript
var susan = firstLens.compose(nameLens).run(george).setter('Susan')
// Object {name: {first:'Susan', last: 'Stanza'}, id: 0}
```

Hhhhmmm...there's a problem there. `susan` is no longer a `Person` she's only an `Object`. We don't want to objectify her do we? I worked around this problem by creating my own `set` function.

```javascript
var set = function(lens, object, value){
   var newObject = lens.run(object).setter(value)
   return _.isEqual(newObject.__proto__, object.__proto__) 
      ? newObject 
      : (newObject.__proto__ = object.__proto__, newObject)
}
//e.g.,
var fred = set(firstLens.compose(nameLens), george, 'Fred')
// Person {name: {first:'Fred', last: 'Stanza'}, id: 0}

```

Now we need to remember that these new objects are not deep clones, only shallow clones, which helps with performance but, if we leave our design pattern we could get in trouble, so be careful!

Note that in [Fantasy Land lenses](https://github.com/fantasyland/fantasy-lenses) the naming convetion is different `setter` and `getter` drop the `ter` and `compose` is dropped in favor of `andThen` making it so you can switch the order of your lenses.

```javascript
var deborah = nameLens.andThen(firstLens).run(george).set('Deborah')
// Object {name: {first: 'Deborah', last: 'Stanza'}, id: 0}
```

If you want to play around with these concepts in jsFiddle you can use lodash.js' `_.assign` method. I've set up the [jsFiddle here.](http://jsfiddle.net/jon49/3xRNT/)
