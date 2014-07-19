// Generated by LiveScript 1.2.0
var getPostInfo, getPostData;
getPostInfo = function(){};
getPostData = function(){
  var self, setPosts, postList;
  switch (false) {
  case !_.isEmpty(coreConfig.posts()):
    self = this;
    setPosts = function(filter, posts){
      this.posts(filter(
      posts.posts));
    };
    postList = {
      method: "GET",
      url: "/posts/posts.json"
    };
    m.request(postList).then(setPosts.bind(self.config, filterPosts)).then(setPosts.bind(coreConfig, filterPosts));
    break;
  }
};
function Controller(){
  var self, document, orCreate404Config, createNewConfig;
  self = this;
  this.config = coreConfig;
  document = {
    method: "GET",
    url: getUrl(m.route()),
    extract: extractDocument
  };
  orCreate404Config = createNewConfig = function(it){
    var it_, newConfig;
    it_ = toConfigStyle(it);
    it_.content.article = m.trust(it_.content.article);
    newConfig = _.merge({}, coreConfig, it_);
    self.config = newConfig;
  };
  m.request(document).then(createNewConfig, orCreate404Config).then(getPostData.bind(self));
}