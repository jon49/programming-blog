---
date: 2014-06-04
title: Prototypes & Compositions with Objects
tags:
   - functional programming
   - design patterns
   - lenses
---

I was trying to figure out the best way to have functions be both compatible with an object oriented paradigm and a functional oriented paradigm when working on objects. My implementations are probably naive, but instructive nevertheless. It seems that [lo-dash](http://lodash.com/) and other libraries have done a good job bridging those worlds.

Let's say you have an object `O` such that

```javascript
function O(a, b){
  this.a = a
  this.b = b
}

var o = function(a, b){
  return new O(a, b)
}
```

Now, you want to `extend` the object but you also want the option to use the object in a more fuctional way with `compose`.

Let's start with a simple `display` method.

```javascript
var display = function(thisArg){
  var o_ = thisArg || this
  console.log(o_)
  return o_
}
```

Then a method to change a property.\*

```javascript
var change = function(property){
  return function(value, thisArg){
  	var o_ = _.cloneDeep(thisArg || this)
    o_[property] = value
    return o_
  }
}
```

Now we can set property to:

```javascript
var changeA = change('a')
```

Then we can add `changeA` to the `O` object and use it.

```javascript
O.prototype.changeA = changeA
var o_ = o(1, 2)
o_.changeA(3).display()
```
Or we can use a functional approach.

```javascript
var o_ = o(1, 2)
_.compose(display, _.curry(changeA)(3))(o_)
//OR
_.compose(display, _.partialRight(changeA, o_))(3)
//OR
_.compose(display, changeA)(3, o_)
```

I think I like the functional approach for the more abstract functions and the OO approach as your code becomes more specific. The functional evangelists say the functional style is better because it leads to more reusable code. Which I would agree with, since you are not tying your code up with an object you can then easily extend your model to various other objects, without the use of `inheritance` and other OO monsters. I think I will use a hybrid approach with `bilby.js` library which uses polymorphism.

By the way, what I just did with `change` is similar to [`lenses`](https://github.com/fantasyland/fantasy-lenses).

\* An alternative to this would be using a partial function, which would make the original function more flexible.

```javascript
var change = function(property, value, thisArg){
  	var o_ = _.cloneDeep(thisArg || this)
    o_[property] = value
    return o_
  }
}
```

Now we can set property to:

```javascript
var changeA = _.partial(change, 'a')
```

Or using combinators (not strict).

```javascript
var set = function(property, value){
  this[property] = value
  return this
}

var change = function(f, value, thisArg){
  	var o_ = _.cloneDeep(thisArg || this)
    o_ = f.apply(o_, [value])
    return o_
  }
}
```

Now we can set property to:

```javascript
var changeA = _.partial(change
              , _.partial(set, 'a'))
```
