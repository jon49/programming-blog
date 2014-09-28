require! <[
   mithril
]>

#single link template
link = ->
   result = 
      m 'a', (
         class: it.class or ''
         href: it.url
         title: it.title or ''
         config: if (it.[]url.indexOf ":") == -1 then m.route else ""
      ), it.value

#link template for header/footer menu
menuLinks = (items) ->
   m 'ul' ((items or []).map -> 
      | it => m 'li' [link it]
      | _ => ''
   )

module.exports = 
   link: link
   menuLinks: menuLinks
