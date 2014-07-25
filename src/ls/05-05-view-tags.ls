# date and tags of posts
tagView = (type, tags) ->
   | isPost() =>
      attach = (if tags.length > 0 then ' - ' else '')
      m 'p.post-meta.pure-u-1',
      [m 'span', 'Posted ' + postDate().toDateString() + attach] ++ (
      (tag) <- tags.map
      m 'span.post-tag', tag
      )
   | _ => ''
