#put all views together
main = (ctrl) ->
   config = ctrl.config
   result = m 'html', [
      m 'head', (headView config.head)
      m 'body', [
         #put all content together
         m '#main' [

            # menu
            menuView config.menuItems

            # header pic/title/subtitle (for pages)
            headerView config.fileType, config.header 

            # main article content
            contentView config.content

            # Show date of post & its tags
            tagView config.fileType, config.tags
            
            # Show next and previous post
            navLinksView config.posts(), config.postMetadata()
            
            # Show archive of posts
            archiveView config.posts(), config.postMetadata(), config.fileType

            # menu social media
            footerMenuView config.footerItems

            # copyright, e-mail, etc.
            footerView config.footer
         ]
      ]
   ]

