// Generated by LiveScript 1.2.0
var isObject, assign, dirname, joinPath;
isObject = function(obj){
  var type;
  type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};
assign = function(obj){
  var source, prop, i, length, k, v;
  if (!isObject(obj)) {
    return obj;
  }
  source = void 8;
  prop = void 8;
  i = 1;
  length = arguments.length;
  while (i < length) {
    source = arguments[i];
    for (k in source) {
      v = source[k];
      obj[k] = v;
    }
    i++;
  }
  return obj;
};
dirname = function(path){
  return join(path('..'));
};
joinPath = function(){
  var parts, i, l, newParts, part;
  parts = [];
  i = 0;
  l = arguments.length;
  while (i < l) {
    parts = parts.concat(arguments[i].split('/'));
    i++;
  }
  newParts = [];
  i = -1;
  l = parts.length;
  while (i < l) {
    i++;
    part = parts[i];
    if (!part || part === '.') {
      continue;
    }
    if (part === '..') {
      newParts.pop();
    } else {
      newParts.push(part);
    }
  }
  if (parts[0] === '') {
    newParts.unshift('');
  }
  return newParts.join('/') || (newParts.length ? '/' : '.');
};