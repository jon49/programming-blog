#single link template
link = -> m 'a', (class: it.class, href: it.url, title: it.title, config: if (it.url.indexOf ":") == -1 then m.route else ""), it.value

#link template for header/footer menu
links = (items) ->
   linkList = (items or []).map link 
   m 'ul' linkList

head = (head) ->
   link = -> m "link" (rel: "stylesheet", href: it.url)
   stylesheets = (head.stylesheets || []).map link
   m 'head', stylesheets ++ (
         m 'meta', charset:"utf-8"
         m 'meta', (httpEquiv:"X-UA-Compatible", content:"IE:edge,chrome:1")
         m 'meta', (name:"viewport", content:"width=device-width, initial-scale=1.0")
         m 'meta', (name:"description", content: head.description)
         m "meta", (name:"generator", content:"maws v0.0.0")
         m 'title', (if head.title then head.title + ' | ' else '') + "Jon's Blog"
         m 'link', (rel:"shortcut icon", href:"./favicon.ico")
   )

#header menu
menu = -> m '.menu', [(links it)]

#header image
header = -> 
   m '.header' [
      m 'a', (href: it.url, class: it.class), [(m 'img', (src: it.src))]
      m 'h1', it.title
      m 'h2.subtitle.fancy', (m 'span' it.subtitle)
   ]

#main article content
content = -> [ m 'article.content', it.article ]

#footer menu e.g., social media, etc.
footerMenu = -> m '#footer-menu.menu', [(links it)]

#footer, e.g., website copyright, tagline, etc.
footer = -> m 'footer.footer', [(m 'p', it.text)]

#put all content together
mainContent = (mithHeader, mithContent, mithMenuFooter, mithFooter) ->
   m '#main', ([mithHeader] ++ [mithContent, mithMenuFooter, mithFooter])

#put all views together
main = (ctrl) ->
   config = ctrl.config
   m 'html', [
      m 'head', (head config.head)
      m 'body', [
         menu(config.menuItems)
         mainContent(
            header config.header
            content config.content
            footerMenu config.footerItems
            footer config.footer
         )
      ]
   ]
