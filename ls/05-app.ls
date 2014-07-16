app = 
   view: main
   controller: Controller

m.route.mode = "pathname"
 
m.route document, "/", ("/": app, "/:page": app)
