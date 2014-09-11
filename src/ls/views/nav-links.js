// Generated by LiveScript 1.2.0
var m, menuLinks, isPost, λ, s, nextPost, previousPost, navLinks;
m = require('mithril');
menuLinks = require('./common').menuLinks;
isPost = require('./../utilities/special').isPost;
λ = require('./../../js/custom-lodash');
s = require('./../utilities/special');
nextPost = function(data, index){
  var linkIndex, data_;
  switch (false) {
  case !((linkIndex = index - 1) > -1 && s.isPost(data[linkIndex].url)):
    data_ = data[linkIndex];
    return {
      'class': 'navlinks-next',
      url: data_.url,
      title: "Next Post: " + data_.title,
      value: m.trust(data_.title + " &raquo;")
    };
  default:
    return '';
  }
};
previousPost = function(data, index){
  var linkIndex, data_;
  switch (true) {
  case (linkIndex = index + 1) < data.length && s.isPost(data[linkIndex].url):
    data_ = data[linkIndex];
    return {
      'class': 'navlinks-prev',
      url: data_.url,
      title: "Previous Post: " + data_.title,
      value: m.trust("&laquo; " + data_.title)
    };
  default:
    return '';
  }
};
navLinks = function(data){
  var index, previousPost_, nextPost_;
  switch (false) {
  case !isPost(m.route()):
    index = λ.findIndex(data, function(it){
      return it.url === m.route();
    });
    previousPost_ = previousPost(data, index);
    nextPost_ = nextPost(data, index);
    return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', menuLinks([previousPost_, nextPost_]));
  default:
    return '';
  }
};
module.exports = navLinks;