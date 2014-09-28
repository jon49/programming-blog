m = require 'mithril'
menuLinks = require './common' .menuLinks
isPost = require './../../utilities/special' .isPost
_ = require './../../../js/custom-lodash'

# links to the later post in list
nextPost = (data, index) ->
   | (linkIndex = index - 1) > -1 and isPost data[linkIndex].url =>
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
   | (linkIndex = index + 1) < data.length and isPost data[linkIndex].url =>
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
   index = _.findIndex data, -> it.url is m.route!
   previousPost_ = previousPost data, index
   nextPost_ = nextPost data, index
   m  '.pure-menu.pure-menu-open.pure-menu-horizontal.menu',
      menuLinks [previousPost_, nextPost_]

module.exports = navLinks
