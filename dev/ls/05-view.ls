#single link template
link = -> result = m 'a', (class: it.class or '', href: it.url, title: it.title or '', config: if (it.[]url.indexOf ":") == -1 then m.route else ""), it.value

#link template for header/footer menu
links = (items) ->
   m 'ul' ((items or []).map -> 
      | _.isEmpty it =>
         ''
      | _ => m 'li' [link it]) 

head = (head) ->
   link = -> m "link" (rel: "stylesheet", href: it.url)
   stylesheets = (head.stylesheets || []).map link
   stylesheets ++ (
      m 'meta', charset:"utf-8"
      m 'meta', (httpEquiv:"X-UA-Compatible", content:"IE:edge,chrome:1")
      m 'meta', (name:"viewport", content:"width=device-width, initial-scale=1.0")
      m 'meta', (name:"description", content: head.description)
      m "meta", (name:"generator", content:"maws v0.0.0")
      m 'title', (if head.title then head.title + ' | ' else '') + "Jon's Blog"
      m 'link', (rel:"shortcut icon", href:"./favicon.ico")
   )

#header menu
menu = -> m '.pure-menu.pure-menu-open.pure-menu-horizontal.menu', (links it)

#header image
header = (type, config) -> 
   m '.header' [
      m 'a', (href: config.url, class: config.class), [(m 'img', (src: config.src))]
   ] ++ switch type
   | 'page' 'archive' =>
      * m 'h1', config.title
        m 'h2', (m 'span' config.subtitle)
   | _ => []

#main article content
content = -> m 'article.content', it.article

tagView = (type, tags) ->
   | isPost() =>
      attach = (if tags.length > 0 then ' - ' else '')
      m 'p.post-meta.pure-u-1',
      [m 'span', 'Posted ' + postDate().toDateString() + attach] ++ (
      (tag) <- tags.map
      m 'span.post-tag', tag
      )
   | _ => ''

#Infinite scroll of posts
postsView = (posts, metadata, type) ->
   switch type
   | 'archive' =>
      m '.pure-menu.pure-menu-open.menu' [
         m '.pure-menu-heading' 'Archive' 
         links (
            for i from (metadata.length - 1) to 0 by -1
               value: m.trust metadata[i].title
               url: posts[i]
         )
      ]
      
   | _ => ''

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

navLinksView = (posts, metadata) ->
   | isPost() =>
      index = posts.indexOf m.route()
      previousPost = previousPostView posts, metadata, index
      nextPost = nextPostView posts, metadata, index
      m  '.pure-menu.pure-menu-open.pure-menu-horizontal.menu', links [previousPost, nextPost]
   | _ => ''

#footer menu e.g., social media, etc.
footerMenu = -> m '#footer-menu.pure-menu.pure-menu-open.pure-menu-horizontal.menu', [(links it)]

#footer, e.g., website copyright, tagline, etc.
footer = -> m 'footer.footer', [(m 'p', it.text)]

#put all views together
main = (ctrl) ->
   config = ctrl.config
   result = m 'html', [
      m 'head', (head config.head)
      m 'body', [
         #put all content together
         m '#main' [

            # menu
            menu config.menuItems

            # header pic/title/subtitle (for pages)
            header config.fileType, config.header 

            # main article content
            content config.content

            # Show date of post & its tags
            tagView config.fileType, config.tags
            
            # Show next and previous post
            navLinksView config.posts(), config.postMetadata()
            
            # Show archive of posts
            postsView config.posts(), config.postMetadata(), config.fileType

            # menu social media
            footerMenu config.footerItems

            # copyright, e-mail, etc.
            footer config.footer
         ]
      ]
   ]

