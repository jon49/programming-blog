// Generated by LiveScript 1.2.0
var m, menuLinks, menu;
m = require('mithril');
menuLinks = require('./common').menuLinks;
menu = function(it){
  return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', menuLinks(it));
};
module.exports = menu;