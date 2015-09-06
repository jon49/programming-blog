---
date: 2014-06-20
title: Match Expression for JavaScript?
tags:
   - functional programming
   - match expressions
   - ternary
   - design patterns
---

Sometimes (or rather most of the time) it would be nice to have more concise code in JavaScript. I was working with a function that needed quite a bit of `if` statements. `if` was awfully cluttered. I had looked at [bilby.js examples](http://bilby.brianmckenna.org/examples/validation.htm) and hadn't realized that you can do multiple `ternary expressions` in a row.

So, instead of,

```javascript
if (0){
  return 0
}
else if (1){
   if (2) {
     return 1
   }
   else if (3) {
     return 2
   }
   else {
     return 3
   }
}
else {
  return 4
}
```

You can do,

```javascript
(0) ? 0
: (1) ?
     (2) ? 1
   : (3) ? 2
   : 3
: 4
```
    
Which is much more concise and readable.

So where does `match expressions` come into play? Glad you asked.

The `ternary` example above gives a similar [feel to `F#`'s `match expressions`](http://fsharpforfunandprofit.com/posts/match-expression/). So, as an example here's what a similary structured `match expression` would look like.

```fsharp
match [something] with 
| pattern0 -> 0
| pattern1 -> 
   match [something else] with
   | pattern2 -> 1
   | pattern3 -> 2
   | _ -> 3
| _ -> 4
```

Of course, with `F#` you could probably get away  without doing the second `match` by using a `Tuple` but that is beyond the scope of this post.

So, let's look at the real function I made. First, let's set up the bare parts of the function.

```javascript
var addRollingArray = function (array, start, end, fraction) {
  var floor = Math.floor
  // Put code below here.
}
```

Then we'll map the array with some helper logic values.

```javascript
  return _.map(array, function (value, index) {
    var isIndexStart = (floor(start) === index),
        isIndexBetween = (floor(start) <= index && index <= floor(end)),
        isIndexEnd = (floor(end) === index)
    // Code below goes here.
  })
```

Here's the `if` code,

```javascript
if (isIndexBetween) {
  if (isIndexStart && isIndexEnd)
    return fraction * (end - start) + value
  else if (isIndexStart)
    return fraction * (1 + index - start) + value
  else if (isIndexEnd)
    return fraction * (end - index) + value
  else
    // Index is fully between start and end values
    return fraction + value
}
// Index is out of bounds return original value
return value
```

And here's the refactored code,

```javascript
return   
  isIndexBetween ? 
      isIndexStart && isIndexEnd ? fraction * (end - start) + value
    : isIndexStart ? fraction * (1 + index - start) + value
    : isIndexEnd   ? fraction * (end - index) + value
    // Index is fully between start and end values
    : fraction + value
  // Index is out of bounds return original value
  : value
```
