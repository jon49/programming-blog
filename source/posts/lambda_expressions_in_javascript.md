---
title: 
---

https://github.com/fschaefer/Lambda.js
https://github.com/dfellis/lambda-js

    var f = function(func){
       var funcArray = func.split('->')
       return   (funcArray.length === 1)
                ? new Function('x', 'return (' + funcArray[0].trim() + ')')
                : new Function(funcArray[0].trim(), 'return (' + funcArray[1].trim() + ')')
    }