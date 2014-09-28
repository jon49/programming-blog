// Generated by LiveScript 1.2.0
var m, menuLinks, s, archive;
m = require('mithril');
menuLinks = require('./common').menuLinks;
s = require('./../../utilities/special');
archive = function(data, type){
  var posts;
  posts = data.filter(function(it){
    return s.isPost(it.url);
  });
  return m('.pure-menu.pure-menu-open.menu', [
    m('.pure-menu-heading', 'Archive'), menuLinks(posts.map(function(it){
      return {
        value: m.trust(it.title),
        url: it.url
      };
    }))
  ]);
};
module.exports = archive;