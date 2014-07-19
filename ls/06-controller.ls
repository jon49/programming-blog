getPostInfo = ->
   void

# get the json post data
getPostData = !->
   | _.isEmpty(coreConfig.posts()) =>
      self = @
      setPosts = (filter, posts) !->
         @posts(posts.posts |> filter)
      postList =
         method: "GET"
         url: "/posts/posts.json"
      m.request postList .then setPosts.bind(self.config, filterPosts) .then setPosts.bind(coreConfig, filterPosts)
   | otherwise => void
      
# Controller used with mithril
!function Controller
   self = @
   @config = coreConfig

   document = 
      method: "GET"
      url: getUrl m.route()
      extract: extractDocument

   orCreate404Config = createNewConfig = !-> 
      it_ = toConfigStyle it
      it_.content.article = m.trust it_.content.article
      newConfig = _.merge {}, coreConfig, it_
      self.config = newConfig

   m.request document .then createNewConfig, orCreate404Config .then getPostData.bind self 
