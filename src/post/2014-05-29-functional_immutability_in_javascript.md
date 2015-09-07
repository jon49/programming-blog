---
title: Functional Immutability in JavaScript
tags: 
   - functional programming
   - immutability
---

This is taken from Michael Fogus' book *Functional JavaScript* in the chapter *Purity, Immutability, and Policies for Change*.

Immutability is impossible to achieve in JavaScript without using `Object.freeze` but it only performs makes the object immutable shallowing, you have to roll your own `deepFreeze` if you would like to make the object truly immutable.

So there are some practices you can do to make your functions and variables perform in a more immutable manner.

```javascript
var SaferQueue = function(elems) {
  this._q = _.clone(elems);
}
```

If you need to you can use a `deepClone` instead.

```javascript
SaferQueue.prototype = {
  enqueue: function(thing) {
    return new SaferQueue(cat(this._q, [thing]));
  }
};
```

Where `cat` concatenates two arrays without changing the values of the original arrays.

And don't forget to encapsulate the `object` instatiation behind a function.
