// Generated by LiveScript 1.2.0
var m, header;
m = require('mithril');
header = function(type, config){
  return m('.header', [m('a', {
    href: config.url,
    'class': config['class']
  }, m('img', {
    src: config.src
  }))].concat((function(){
    switch (type) {
    case 'page':
    case 'archive':
      return [m('h1', config.title), m('h2', m('span', config.subtitle))];
    default:
      return [];
    }
  }())));
};
module.exports = header;