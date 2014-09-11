m = require 'mithril'
s = require './../utilities/special'

# date and tags of posts
tags = (type, tags) ->
   | s.isPost m.route! =>
      attach = (if tags.length > 0 then ' - ' else '')
      m 'p.post-meta.pure-u-1',
      [m 'span', 'Posted ' + (s.postDate m.route! .toDateString!) + attach] ++ (
         (tag) <- tags.map
         m 'span.post-tag', tag
      )
   | _ => ''

module.exports = tags
