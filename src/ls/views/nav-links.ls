m = require 'mithril'
menuLinks = require './common' .menuLinks
isPost = require './../utilities/special' .isPost
_ = require './../../js/custom-lodash'
s = require './../utilities/special'

# links to the later post in list
nextPost = (data, index) ->
   switch 
   | (linkIndex = index - 1) > -1 and s.isPost data[linkIndex].url =>
      data_ = data[linkIndex]
      (
         class: 'navlinks-next'
         url: data_.url
         title: ("Next Post: #{data_.title}")
         value: m.trust("#{data_.title} &raquo;")
      )
   | _ => ''

# link to earlier post
previousPost = (data, index) ->
   switch true
   | (linkIndex = index + 1) < data.length and s.isPost data[linkIndex].url =>
      data_ = data[linkIndex]
      (
         class: 'navlinks-prev'
         url: data_.url
         title: ("Previous Post: #{data_.title}")
         value: m.trust("&laquo; #{data_.title}")
      )
   | _ => ''

# puts links together when it is a post.
navLinks = (data) ->
   | isPost m.route! =>
      index = _.findIndex data, -> it.url is m.route!
      previousPost_ = previousPost data, index
      nextPost_ = nextPost data, index
      m  '.pure-menu.pure-menu-open.pure-menu-horizontal.menu',
         menuLinks [previousPost_, nextPost_]
   | _ => ''

module.exports = navLinks
