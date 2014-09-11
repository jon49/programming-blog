// Generated by LiveScript 1.2.0
var m, head;
m = require('mithril');
head = function(head){
  var link, stylesheets;
  link = function(it){
    return m("link", {
      rel: "stylesheet",
      href: it.url
    });
  };
  stylesheets = (head.stylesheets || []).map(link);
  return stylesheets.concat((m('meta', {
    charset: "utf-8"
  }), m('meta', {
    httpEquiv: "X-UA-Compatible",
    content: "IE:edge,chrome:1"
  }), m('meta', {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), m('meta', {
    name: "description",
    content: head.description
  }), m("meta", {
    name: "generator",
    content: "maws v0.0.0"
  }), m('title', (head.title ? head.title + ' | ' : '') + "Jon's Blog"), m('link', {
    rel: "shortcut icon",
    href: "./favicon.ico"
  })));
};
module.exports = head;