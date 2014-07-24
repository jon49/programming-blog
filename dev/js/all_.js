var replaceAt, isPattern, removeExtension, pagePattern, postPattern, postUglyPattern, postLinkPattern, withPostUrl, withFriendlyPostUrl, withPostDate, withPageUrl, filterPosts, isPost, postDate, getUrl, extractObject, parseDocument, extractDocument, toConfigStyle, coreConfig, propDo, postList, infiniteScroll, link, links, head, menu, header, content, tagView, postsView, nextPostView, previousPostView, navLinksView, footerMenu, footer, main, app;
replaceAt = function(index, char, string){
  switch (false) {
  case !(index < 0):
    return string.slice(0, index) + char + string.slice(index + 1);
  default:
    return string.slice(0, index) + char + string.slice(index + 1);
  }
};
isPattern = function(regex, string){
  return regex.test(string);
};
removeExtension = function(it){
  return it.slice(0, it.lastIndexOf("."));
};
/---Routinglogic---/;
pagePattern = new RegExp("/(\\w+)");
postPattern = new RegExp("/(\\d{4})/(\\d{2})/(\\d{2})/(.+)");
postUglyPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
postLinkPattern = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})-(.+)");
withPostUrl = function(match_, year, month, day, postName){
  return "/posts/" + year + "-" + month + "-" + day + "-" + postName + ".html";
};
withFriendlyPostUrl = function(match_, year, month, day, postName){
  var postName_;
  postName_ = removeExtension(postName);
  return "/" + year + "/" + month + "/" + day + "/" + postName_;
};
withPostDate = function(match_, year, month, day){
  return new Date(year, month - 1, day);
};
withPageUrl = function(match_, pageName){
  return "/pages/" + pageName + ".html";
};
filterPosts = function(it){
  return it.filter(function(it){
    return isPattern(postLinkPattern, it);
  });
};
isPost = function(){
  return isPattern(postPattern, m.route());
};
postDate = function(){
  return new Date(m.route().replace(postPattern, withPostDate));
};
getUrl = function(route){
  switch (false) {
  case !isPattern(postPattern, route):
    return route.replace(postPattern, withPostUrl);
  case !isPattern(pagePattern, route):
    return route.replace(pagePattern, withPageUrl);
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
    left = extractObject(it[0]).slice(0, -1).replace(/,]/g, "]");
    right = it[1].replace(/\\/g, '\\\\').replace(/"/g, "\\\"").replace(/\//g, "\\/").replace(/\n/g, "\\n");
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
  x.tags = it.tags;
  return x;
};
coreConfig = {
  head: {
    description: "A blog on programming. Mostly JavaScript.",
    title: "Jon's Blog",
    stylesheets: [
      {
        url: "//yui.yahooapis.com/pure/0.5.0/pure-min.css"
      }, {
        url: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
      }, {
        url: "/css/style.css"
      }
    ]
  },
  menuItems: [
    {
      value: "Archive",
      url: "/",
      title: ""
    }, {
      value: "About",
      url: "/about",
      title: ""
    }
  ],
  header: {
    url: "/",
    'class': "",
    src: "/images/fire.png",
    title: "This is a Filler",
    subtitle: "Filling Up"
  },
  content: {
    article: "Loading..."
  },
  tags: [],
  previousPost: {
    value: "",
    title: "",
    url: ""
  },
  nextPost: {
    value: "",
    title: "",
    url: ""
  },
  footerItems: [
    {
      value: "",
      url: "http://thisisafiller-jon.tumblr.com/rss",
      title: "RSS Feed",
      'class': "fa fa-rss fa-2x"
    }, {
      value: "",
      url: "https://github.com/jon49/",
      title: "Personal Github Account",
      'class': "fa fa-github fa-2x"
    }, {
      value: "",
      url: "https://twitter.com/NymanJon",
      title: "Personal Twitter Account",
      'class': "fa fa-twitter fa-2x"
    }, {
      value: "",
      url: "https://plus.google.com/communities/101170592821781215530",
      title: "Prescott Developer's Google+ Site",
      'class': "fa fa-google-plus fa-2x"
    }, {
      value: "",
      url: "http://www.meetup.com/The-Prescott-Software-Developers-Meetup-Group/",
      title: "Prescott Developer's Meetup.com Site",
      'class': "fa fa-coffee fa-2x"
    }
  ],
  footer: {
    text: m.trust("&copy; 2014 Jon Nyman<br />nymanjon@gmail.com<br />Still Empty")
  },
  fileType: "",
  posts: m.prop([]),
  postMetadata: function(){
    var postMetadata;
    postMetadata = {
      method: "GET",
      url: "/posts/metadata.json"
    };
    return m.request(postMetadata);
  }()
};
propDo = curry$(function(prop, fn, value){
  prop(fn.call(null, value));
});
postList = {
  method: "GET",
  url: "/posts/posts.json"
};
m.request(postList).then(propDo(coreConfig.posts, function(it){
  return it.posts.map(function(uglyUrl){
    return uglyUrl.replace(postUglyPattern, withFriendlyPostUrl);
  });
}));
infiniteScroll = function(state, e){
  return window.addEventListener("scroll", function(e){
    state.pageY = Math.max(e.pageY || window.pageYOffset, 0);
    state.pageHeight = window.innerHeight;
    return m.redraw();
  });
};
link = function(it){
  var result;
  return result = m('a', {
    'class': it['class'] || '',
    href: it.url,
    title: it.title || '',
    config: (it.url || (it.url = [])).indexOf(":") === -1 ? m.route : ""
  }, it.value);
};
links = function(items){
  return m('ul', (items || []).map(function(it){
    switch (false) {
    case !_.isEmpty(it):
      return '';
    default:
      return m('li', [link(it)]);
    }
  }));
};
head = function(head){
  var link, stylesheets;
  link = function(it){
    return m("link", {
      rel: "stylesheet",
      href: it.url
    });
  };
  stylesheets = (head.stylesheets || []).map(link);
  return stylesheets.concat((m('meta', {
    charset: "utf-8"
  }), m('meta', {
    httpEquiv: "X-UA-Compatible",
    content: "IE:edge,chrome:1"
  }), m('meta', {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), m('meta', {
    name: "description",
    content: head.description
  }), m("meta", {
    name: "generator",
    content: "maws v0.0.0"
  }), m('title', (head.title ? head.title + ' | ' : '') + "Jon's Blog"), m('link', {
    rel: "shortcut icon",
    href: "./favicon.ico"
  })));
};
menu = function(it){
  return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', links(it));
};
header = function(type, config){
  return m('.header', [m('a', {
    href: config.url,
    'class': config['class']
  }, [m('img', {
    src: config.src
  })])].concat((function(){
    switch (type) {
    case 'page':
    case 'archive':
      return [m('h1', config.title), m('h2', m('span', config.subtitle))];
    default:
      return [];
    }
  }())));
};
content = function(it){
  return m('article.content', it.article);
};
tagView = function(type, tags){
  var attach;
  switch (false) {
  case !isPost():
    attach = tags.length > 0 ? ' - ' : '';
    return m('p.post-meta.pure-u-1', [m('span', 'Posted ' + postDate().toDateString() + attach)].concat(tags.map(function(tag){
      return m('span.post-tag', tag);
    })));
  default:
    return '';
  }
};
postsView = function(posts, metadata, type){
  var i;
  switch (type) {
  case 'archive':
    return m('.pure-menu.pure-menu-open.menu', [
      m('.pure-menu-heading', 'Archive'), links((function(){
        var i$, results$ = [];
        for (i$ = metadata.length - 1; i$ >= 0; --i$) {
          i = i$;
          results$.push({
            value: m.trust(metadata[i].title),
            url: posts[i]
          });
        }
        return results$;
      }()))
    ]);
  default:
    return '';
  }
};
nextPostView = function(posts, metadata, index){
  var linkIndex, post, meta;
  switch (linkIndex = index + 1) {
  case posts.length || metadata.length:
    return '';
  default:
    post = posts[linkIndex];
    meta = metadata[linkIndex];
    return {
      'class': 'navlinks-next',
      url: post,
      title: 'Next Post: ' + meta.title,
      value: m.trust(meta.title + ' &raquo;')
    };
  }
};
previousPostView = function(posts, metadata, index){
  var linkIndex, post, meta;
  switch (linkIndex = index - 1) {
  case -1:
    return '';
  default:
    post = posts[linkIndex];
    meta = metadata[linkIndex];
    return {
      'class': 'navlinks-prev',
      url: post,
      title: 'Previous Post: ' + meta.title,
      value: m.trust('&laquo; ' + meta.title)
    };
  }
};
navLinksView = function(posts, metadata){
  var index, previousPost, nextPost;
  switch (false) {
  case !isPost():
    index = posts.indexOf(m.route());
    previousPost = previousPostView(posts, metadata, index);
    nextPost = nextPostView(posts, metadata, index);
    return m('.pure-menu.pure-menu-open.pure-menu-horizontal.menu', links([previousPost, nextPost]));
  default:
    return '';
  }
};
footerMenu = function(it){
  return m('#footer-menu.pure-menu.pure-menu-open.pure-menu-horizontal.menu', [links(it)]);
};
footer = function(it){
  return m('footer.footer', [m('p', it.text)]);
};
main = function(ctrl){
  var config, result;
  config = ctrl.config;
  return result = m('html', [m('head', head(config.head)), m('body', [m('#main', [menu(config.menuItems), header(config.fileType, config.header), content(config.content), tagView(config.fileType, config.tags), navLinksView(config.posts(), config.postMetadata()), postsView(config.posts(), config.postMetadata(), config.fileType), footerMenu(config.footerItems), footer(config.footer)])])]);
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
  m.request(document).then(createNewConfig, orCreate404Config);
}
app = {
  view: main,
  controller: Controller
};
m.route.mode = "pathname";
m.route(document, "/", {
  "/": app,
  "/:date.../:post": app,
  "/:page": app
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}