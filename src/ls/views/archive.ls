m = require 'mithril'
menuLinks = require './common' .menuLinks
s = require './../utilities/special'

# archive of posts
archive = (data, type) ->
   posts = data.filter -> s.isPost it.url
   switch type
   | 'archive' =>
      m '.pure-menu.pure-menu-open.menu' [
         m '.pure-menu-heading' 'Archive' 
         menuLinks (
            posts.map ->
               value: m.trust it.title
               url: it.url
         )
      ]
      
   | _ => ''

module.exports = archive
