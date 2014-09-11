require! <[
   mithril
   ./controllers/archive
   ./controllers/post
   ./controllers/page
   ./views/main
]>

app = ->
   view: main
   controller: it

m.route.mode = "pathname"
 
m.route document, "/", (
   "/": app archive
   "/:date.../:post": app post
   "/:page": app page
)
