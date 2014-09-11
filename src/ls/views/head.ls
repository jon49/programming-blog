m = require 'mithril'

# html head data.
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

module.exports = head
