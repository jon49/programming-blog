getUrl = (route) -> 
   if ((route.match /\//g) or []).length == 1 and route.length > 1
   then joinPath "pages" (route + ".html") 
   else "/pages/index.html"

extractObject = -> 
   start = it.indexOf "{"
   end = (it.lastIndexOf "}") + 1
   if start and end
   then it.slice start, end
   else ""

parseDocument = ->
   if it.length == 1
   then content: (article: it.replace(/"/g,"\\\"").replace(/\//g,"\\\/").replace(/\n/g, ""))
   else
      left = (extractObject it[0]).slice 0, -1
      right = it[1].replace(/"/g,"\\\"").replace(/\//g,"\\\/").replace(/\n/g, "")
      result = "#left, \"content\": {\"article\": \"#right\"}}"

extractDocument = -> parseDocument (it.responseText.split "-->")

# Controller used with mithril
function Controller
   self = @
   @config = coreConfig

#    xhr = new XMLHttpRequest()
#    xhr.open "GET", (getUrl m.route()), true
#    xhr.onreadystatechange = ->
#       | @readyState == 4 and @status < 300 and @status >= 200 => 
#          result = extractDocument it.currentTarget.responseText
#          newConfig = JSON.parse result
#          self.config = newConfig
#          void
#       | otherwise => void
#    xhr.send()

   settings = 
      method: "GET"
      url: getUrl m.route()
      extract: extractDocument

   m.request(settings).then(
      !-> 
         it.content.article = m.trust it.content.article
         newConfig = assign {}, coreConfig, it
         self.config = newConfig
      )
   void
