// Generated by LiveScript 1.2.0
/---Routinglogic---/;
var pagePattern, postPattern, postLinkPattern, withPostUrl, withFriendlyPostUrl, withPageUrl, filterPosts, getUrl, extractObject, parseDocument, extractDocument, toConfigStyle;
pagePattern = new RegExp("/(\\w+)");
postPattern = new RegExp("/(\\d{4})/(\\d{2})/(\\d{2})/(.+)");
postLinkPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
withPostUrl = function(match_, year, month, day, postName){
  return "/posts/" + year + "-" + month + "-" + day + "-" + postName + ".html";
};
withFriendlyPostUrl = function(match_, year, month, day, postName){
  var postName_;
  postName_ = removeExtension(postName);
  return "/" + year + "/" + month + "/" + day + "/" + postName_;
};
withPageUrl = function(match_, pageName){
  return "/pages/" + pageName + ".html";
};
filterPosts = function(it){
  return it.filter(function(it){
    return isPattern(postLinkPattern, it);
  });
};
getUrl = function(route){
  switch (false) {
  case !isPattern(pagePattern, route):
    return route.replace(pagePattern, withPageUrl);
  case !isPattern(postPattern, route):
    return route.replace(postPattern, withPostUrl);
  default:
    return "/pages/index.html";
  }
};
/---htmlpreprocessing---/;
extractObject = function(it){
  var start, end, result;
  switch (false) {
  case !((start = it.indexOf("{")) >= 0 && (end = it.lastIndexOf("}") + 1) > start):
    result = it.slice(start, end).trim().replace(/\n/g, "");
    if (result.slice(-2, -1) === ",") {
      return replaceAt(-2, "", result);
    } else {
      return result;
    }
    break;
  default:
    return "";
  }
};
parseDocument = function(it){
  var left, right, result;
  switch (false) {
  case it.length !== 1:
    return JSON.stringify({
      article: it[0].replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "")
    });
  default:
    left = extractObject(it[0]).slice(0, -1);
    right = it[1].replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "\\n");
    return result = left + ", \"article\": \"" + right + "\"}";
  }
};
extractDocument = function(it){
  switch (false) {
  case it.responseText === "Not found\n":
    return parseDocument(it.responseText.split("-->"));
  default:
    return JSON.stringify({
      title: "404",
      subtitle: "You've Been 404ed",
      article: "Oops! I couldn't find that page!"
    });
  }
};
/---configobjectpreprocessing--/;
toConfigStyle = function(it){
  var x;
  x = {};
  (x.head || (x.head = {})).description = it.description;
  (x.head || (x.head = {})).title = it.title;
  (x.content || (x.content = {})).article = it.article;
  (x.header || (x.header = {})).title = it.title;
  (x.header || (x.header = {})).subtitle = it.subtitle;
  x.fileType = it.type;
  return x;
};