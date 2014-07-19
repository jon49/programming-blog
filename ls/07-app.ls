app = 
   view: main
   controller: Controller

m.route.mode = "pathname"
 
m.route document, "/", (
   "/": app
   "/:date.../:post": app
   "/:page": app
)
