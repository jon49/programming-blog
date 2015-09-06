---
date: 2014-05-15
title: Notes on Monads, Monoids, and Make Believe
subtitle: with Brian Lonsdorf
tags:
   - functional programming
   - functor
   - design patterns
---

## with Brian Lonsdorf

### Working with Objects

#### the better way

```javascript
var SSN = Constructor(function(number, current_user){
	this.number = number
    this.user = current_user
})

SSN.prototype = {
	fmap: function(f){
    	if(this.user.is_admin)
        	return SSN(f(this.number), this.user)
    }
}

social.fmap(replace('-', ''))
//=> SSN('123456789', user)

social.fmap(function(number){return number.reverse()})
//=> SSN('1234-56-789', user)
```

#### the functor way

Note: [Functor function defined.](https://github.com/DrBoolean/Functor/blob/master/functor.js)

```javascript
var AdminAccess = Constructor(function(val, current_user){
	this.val = val
    this.user = current_user
})

Functor(AdminAccess, {
	fmap: function(f){
    	if(this.user.is_admin)
        	return AdminAccess(f(this.val), this.user)
    }
})

var social = AdminAccess('1234-56-789', current_user)
fmap(removeDashes, social)
//=> AdminAccess('123456789', current_user)
fmap(validNumber, social)
//=> AdminAccess(true, current_user)
```

He then goes into other useful patterns with monads. But I'll revisit that later after I get a better handle on this!

<iframe width="560" height="315" src="//www.youtube.com/embed/ww2Z1URx-G0" frameborder="0" allowfullscreen></iframe>
