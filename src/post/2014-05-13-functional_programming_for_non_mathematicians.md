---
title: Notes On Functional Programming
subtitle: Patterns for the Non-Mathematician with Brian Lonsdorf
tags:
   - functional programming
   - maybe
   - either
   - functor
   - lenses
---

## Patterns for the Non-Mathematician with Brian Lonsdorf

### Lenses

Using lenses for composable/polymorphic model manipulation.

E.g.,

```javascript
var user = {id:1, name:{first:'doris', last:'day'}}
var L = makeLenses(['name', 'first'])
var firstNameChar = compose(L.name, L.first, _1)
over(firstNameChar, toUpperCase, user)
//=> {id:1, name:{first:'Doris', last:'day'}}
```

### Maybe

Use `Maybe` (Haskell) types (`Option` types in bilby.js / Scala style) to make composition easier. This works with `fmap` (functor maps). Returns resultant `option`.

### Error Handling (Either)

```javascript
Either('need an int', 3)
//=> Right(3)

Either('need an int', undefined)
//=> Left('need an int')

fmap(function(x){return x+1;}, Right(2))
//=> Right(3)

fmap(function(x){return x+1;}, Left('need an int'))
//=> Left('need an int')

compose(fmap(f), Either(error))
```
### Future Values

I'll have to come back to this one later when I use it more.

### Functor

> Something that implements **map**

Like Promise, Maybe, Either, etc.

### Nesting

Use mjoin (flatMap -- bilby.js) to flatten nesting.

```javascript
var getField = compose(Maybe, document.querySelector)
var getValue = compose(Maybe, pluck('value'))

var greet = compose(fmap(fmap(concat('hello')))
                    , fmap(getValue), getField)
greet('#name')
//=> Maybe(Maybe('hello chris'))

var greet = compose(fmap(concat('hello'))
                    , mjoin
                    , fmap(getValue), getField)
greet('#name')
//=> Maybe('hello chris')
```

### Mutiple Values (liftA2)

```javascript
liftA2(f, A(x), A(y))

liftA2(add, Maybe(3), Maybe(4))
//=> Maybe(7)

liftA2(add, Maybe(null), Maybe(4))
//=> Maybe(null)
```

### Examples

#### Lenses

```javascript
var L = makeLenses(['body', 'viewed'])
var comment = {id:2, body: "this is a *great* post", viewed: false}
var showOnScreen = log
var prog = compose(showOnScreen, set(L.viewed, true), over(L.body, markdown))
prog(comment)
//=> {id:2, body: '<p>this is a <em>great</em> post!</p>', viewed: true}
```

#### Either/Maybe

```javascript
var getWords = compose(Either('you need some words')
               , match(/\w+/g))
var showCount = compose(concat('The count is: ')
                , pluck('length'))
var prog = compose(fmap(showCount), getWords)
var result = progr(' blah ')
log(result)
//=> Right('The count is: 1')
```

**These notes came from the video below:**

[The full slides are also available.](https://github.com/DrBoolean/patterns_talk)

<iframe width="560" height="315" src="//www.youtube.com/embed/AvgwKjTPMmM" frameborder="0" allowfullscreen></iframe>
