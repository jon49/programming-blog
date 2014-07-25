# archive of posts
archiveView = (posts, metadata, type) ->
   switch type
   | 'archive' =>
      m '.pure-menu.pure-menu-open.menu' [
         m '.pure-menu-heading' 'Archive' 
         menuLinks (
            for i from (metadata.length - 1) to 0 by -1
               value: m.trust metadata[i].title
               url: posts[i]
         )
      ]
      
   | _ => ''
