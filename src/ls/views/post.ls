require! <[
   mithril
   ./components/head
   ./components/menu
   ./components/header
   ./components/content
   ./components/tags
   ./components/nav-links
   ./components/footer-menu
   ./components/footer
]>

#put all views together
post = (ctrl) ->
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
            content config.article

            # Show date of post & its tags
            tags config.fileType, config.tags
            
            # Show next and previous post
            nav-links config.data
            
            # menu social media
            footer-menu config.footerItems

            # copyright, e-mail, etc.
            footer config.footer
         ]
      ]
   ]

module.exports = post
