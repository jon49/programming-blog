# links to the later post in list
nextPostView = (posts, metadata, index) ->
   switch (linkIndex = index + 1)
   | posts.length || metadata.length => ''
   | _ =>
      post = posts[linkIndex]
      meta = metadata[linkIndex]
      (
         class: 'navlinks-next'
         url: post
         title: ('Next Post: ' + meta.title)
         value: m.trust(meta.title + ' &raquo;')
      )

# link to earlier post
previousPostView = (posts, metadata, index) ->
   switch (linkIndex = index - 1)
   | -1 => ''
   | _ =>
      post = posts[linkIndex]
      meta = metadata[linkIndex]
      (
         class: 'navlinks-prev'
         url: post
         title: ('Previous Post: ' + meta.title)
         value: m.trust('&laquo; ' + meta.title)
      )

# puts links together when it is a post.
navLinksView = (posts, metadata) ->
   | isPost() =>
      index = posts.indexOf m.route()
      previousPost = previousPostView posts, metadata, index
      nextPost = nextPostView posts, metadata, index
      m  '.pure-menu.pure-menu-open.pure-menu-horizontal.menu', menuLinks [previousPost, nextPost]
   | _ => ''
