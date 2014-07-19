//--- Routing logic ---//
pagePattern = new RegExp "/(\\w+)" 

postPattern = new RegExp "/(\\d{4})/(\\d{2})/(\\d{2})/(.+)"

postLinkPattern = new RegExp "(\\d{4})-(\\d{2})-(\\d{2})-(.+)"

withPostUrl = (match_, year, month, day, postName) -> 
   "/posts/#year-#month-#day-#postName.html"

withFriendlyPostUrl = (match_, year, month, day, postName) ->
   postName_ = removeExtension postName
   "/#year/#month/#day/#postName_"

withPageUrl = (match_, pageName) -> 
   "/pages/#pageName.html"

filterPosts = ->
   <- it.filter
   isPattern postLinkPattern, it

getUrl = (route) -> 
   | isPattern pagePattern, route =>
      route.replace pagePattern, withPageUrl
   | isPattern postPattern, route =>
      route.replace postPattern, withPostUrl
   | otherwise => "/pages/index.html"

//--- html preprocessing ---//
extractObject = -> 
   | (start = it.indexOf "{") >= 0 and (end = (it.lastIndexOf "}") + 1) > start =>
      result = it.slice start, end .trim().replace /\n/g, ""
      if (result.slice -2 -1) == "," then replaceAt(-2, "", result) else result
   | otherwise => ""

parseDocument = ->
   | it.length == 1 => 
      JSON.stringify article: (it[0].replace /"/g,"\\\"" .replace /\//g,"\\\/" .replace /\n/g, "") 
   | otherwise => 
      left = (extractObject it[0]).slice 0, -1
      right = it[1].replace(/"/g,"\\\"").replace(/\//g,"\\\/").replace(/\n/g, "\\n")
      result = "#left, \"article\": \"#right\"}"

extractDocument = -> 
   | it.responseText isnt "Not found\n" =>
      parseDocument (it.responseText.split "-->")
   | otherwise => 
      JSON.stringify do
         title: "404" 
         subtitle: "You've Been 404ed"
         article: "Oops! I couldn't find that page!"

//--- config object preprocessing --//

# If property exists then put in config style
toConfigStyle = ->
   x = {}
   x.{}head.description = it.description
   x.{}head.title = it.title
   x.{}content.article = it.article
   x.{}header.title = it.title
   x.{}header.subtitle = it.subtitle
   x.fileType = it.type
   x
