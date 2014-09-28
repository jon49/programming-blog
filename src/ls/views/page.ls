require! <[
   mithril
   ./components/head
   ./components/menu
   ./components/header
   ./components/content
   ./components/footer-menu
   ./components/footer
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

            # menu social media
            footer-menu config.footerItems

            # copyright, e-mail, etc.
            footer config.footer
         ]
      ]
   ]

module.exports = main
