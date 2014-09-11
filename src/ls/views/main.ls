require! <[
   mithril
   ./head
   ./menu
   ./header
   ./content
   ./tags
   ./nav-links
   ./archive
   ./footer-menu
   ./footer
]>

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
            tags config.fileType, config.tags
            
            # Show next and previous post
            nav-links config.data
            
            # Show archive of posts
            archive config.data, config.fileType

            # menu social media
            footer-menu config.footerItems

            # copyright, e-mail, etc.
            footer config.footer
         ]
      ]
   ]

module.exports = main
