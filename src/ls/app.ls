require! <[
   mithril
   ./controllers/controller
   ./views/archive
   ./views/post
   ./views/page
]>

app = (view, controller) ->
   view: view
   controller: controller

m.route.mode = 'pathname'
 
m.route document, '/', (
   '/': app archive, controller
   '/:date.../:post': app post, controller
   '/:page': app page, controller
)
