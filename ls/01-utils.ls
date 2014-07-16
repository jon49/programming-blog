#underscore.js - _.isObject
isObject = (obj) ->
  type = typeof obj
  type is 'function' or type is 'object' and !!obj

#underscore.js - _.extend
assign = (obj) ->
  return obj if not isObject obj
  source = void
  prop = void
  i = 1
  length = &.length
  while i < length
    source = &[i]
    for k, v of source
      obj[k] = v
    i++
  obj

dirname = (path) -> join path '..'

joinPath = ->
  parts = []
  i = 0
  l = &.length
  while i < l
    parts = parts.concat &[i].split '/'
    i++
  newParts = []
  i = -1
  l = parts.length
  while i < l
    i++
    part = parts[i]
    continue if not part or part is '.'
    if part is '..' then newParts.pop! else newParts.push part
  if parts.0 is '' then newParts.unshift ''
  (newParts.join '/') or if newParts.length then '/' else '.'
