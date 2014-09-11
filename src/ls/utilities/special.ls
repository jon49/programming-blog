t = require './general'

//--- Routing logic ---//
pagePattern = new RegExp "/(\\w+)" 

postPattern = new RegExp "/(\\d{4})/(\\d{2})/(\\d{2})/(.+)"
postUglyPattern = new RegExp "(\\d{4})-(\\d{2})-(\\d{2})-(.+)"

postLinkPattern = new RegExp "(\\d{4})-(\\d{2})-(\\d{2})-(.+)"

redirectPattern = '#!/'

withPostUrl = (match_, year, month, day, postName) -> 
   "/posts/#year-#month-#day-#postName.html"

withFriendlyPostUrl = (match_, year, month, day, postName) ->
   postName_ = removeExtension postName
   "/#year/#month/#day/#postName_"

withPostDate = (match_, year, month, day) ->
   new Date year, (month - 1), day

withPageUrl = (match_, pageName) -> 
   "/pages/#pageName.html"

filterPosts = ->
   <- it.filter
   t.isPattern postLinkPattern, it

isPost = ->
   t.isPattern postPattern, it

postDate = (route) ->
   new Date(route.replace postPattern, withPostDate)

module.exports = 
   postDate: postDate
   isPost: isPost
