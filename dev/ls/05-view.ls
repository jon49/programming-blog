#single link template
link = -> result = m 'a', (class: it.class or '', href: it.url, title: it.title or '', config: if (it.url.indexOf ":") == -1 then m.route else ""), it.value

#link template for header/footer menu
links = (items) ->
   m 'ul' ((items or []).map -> m 'li' [link it]) 

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
header = -> 
   m '.header' [
      m 'a', (href: it.url, class: it.class), [(m 'img', (src: it.src))]
      m 'h1', it.title
      m 'h2.subtitle.fancy', (m 'span' it.subtitle)
   ]

#main article content
content = -> m 'article.content', it.article

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
            menu config.menuItems
            header config.header
            content config.content
            postsView config.posts(), config.postMetadata(), config.fileType
            footerMenu config.footerItems
            footer config.footer
         ]
      ]
   ]
